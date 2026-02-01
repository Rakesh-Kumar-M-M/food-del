/*
 * check-case.js
 * Scans source files for relative imports and validates that the import path's
 * file and folder casing exactly matches the filesystem (useful for Linux builds).
 * Exit code 1 if mismatches are found.
 */

import fs from 'fs'
import path from 'path'

const SRC_DIR = path.resolve(process.cwd(), 'src')
const EXTENSIONS = ['.jsx', '.js', '.ts', '.tsx', '.css']
const ASSET_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.ico', '.pdf']

function walk(dir){
  const files = []
  for(const entry of fs.readdirSync(dir, {withFileTypes:true})){
    const full = path.join(dir, entry.name)
    if(entry.isDirectory()) files.push(...walk(full))
    else if(/\.(jsx|js|ts|tsx)$/.test(entry.name)) files.push(full)
  }
  return files
}

function readImports(file){
  const content = fs.readFileSync(file,'utf8')
  const re = /import\s+(?:[^'\"]+from\s+)?['\"](\.\.?\/.+?)['\"]/g
  const imports = []
  let m
  while((m=re.exec(content))!==null){
    imports.push(m[1])
  }
  return imports
}

function fileExistsCaseSensitive(importBase, cwd){
  // importBase is relative path like ./components/Navbar/Navbar or ./image.png
  // If import already has an extension, check directly; otherwise try resolve with possible extensions and /index.*
  const ext = path.extname(importBase)
  const candidates = []
  if(ext){
    candidates.push(importBase)
  }else{
    for(const e of EXTENSIONS){
      candidates.push(importBase + e)
      candidates.push(path.join(importBase, 'index'+e))
    }
    for(const e of ASSET_EXTENSIONS){
      candidates.push(importBase + e)
    }
  }

  for(const candidate of candidates){
    const abs = path.resolve(cwd, candidate)
    if(fs.existsSync(abs)){
      // Now verify casing by walking from filesystem root to abs and comparing each segment exactly
      const root = path.parse(abs).root
      const parts = path.relative(root, abs).split(path.sep)
      let cur = root
      let match = true
      for(const part of parts){
        const children = fs.readdirSync(cur)
        if(!children.includes(part)){
          match=false;break
        }
        cur = path.join(cur, part)
      }
      if(match) return {exists:true, resolved:abs}
      else return {exists:false, resolved:abs}
    }
  }
  return {exists:false, resolved:null}
}

function main(){
  const files = walk(SRC_DIR)
  const problems = []
  for(const file of files){
    const imports = readImports(file)
    for(const imp of imports){
      if(!imp.startsWith('./') && !imp.startsWith('../')) continue
      const cwd = path.dirname(file)
      const result = fileExistsCaseSensitive(imp, cwd)
      if(!result.exists){
        problems.push({file, imp, resolved: result.resolved})
      }
    }
  }

  if(problems.length>0){
    console.error('\nCase mismatches found in imports (these will fail on case-sensitive filesystems):\n')
    for(const p of problems){
      console.error(`- In ${path.relative(process.cwd(),p.file)} -> import '${p.imp}'`)
      if(p.resolved) console.error(`  Resolved path exists but with different casing: ${p.resolved}`)
      else console.error('  No corresponding file found (checked typical extensions and index files)')
    }
    process.exit(1)
  }else{
    console.log('No case mismatches found.')
    process.exit(0)
  }
}

main()
