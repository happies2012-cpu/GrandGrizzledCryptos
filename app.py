"""
App launcher — starts the React/Vite dev server on port 5000.

The Nix cpplibs libstdc++ is missing CXXABI_1.3.15 (required by icu4c-76).
Fix: prepend an isolated directory that contains ONLY a symlink to the Ubuntu
system libstdc++.so.6 (which has CXXABI_1.3.15).  Keeping only that one lib
prevents the bash nix-wrapper from pulling in mismatched Ubuntu glibc/vdso.
"""
import subprocess
import sys
import os
import shutil

os.chdir(os.path.dirname(os.path.abspath(__file__)) or ".")

# Create isolated compat dir with just the system libstdc++ symlink.
compat_dir = "/tmp/libstdc_compat"
os.makedirs(compat_dir, exist_ok=True)
src_lib = "/usr/lib/x86_64-linux-gnu/libstdc++.so.6"
dst_lib = os.path.join(compat_dir, "libstdc++.so.6")
if not os.path.exists(dst_lib):
    os.symlink(src_lib, dst_lib)

env = {**os.environ}
ld = env.get("LD_LIBRARY_PATH", "")
env["LD_LIBRARY_PATH"] = f"{compat_dir}:{ld}" if ld else compat_dir

node = shutil.which("node")
if not node:
    print("ERROR: node not found in PATH", flush=True)
    sys.exit(1)

vite = os.path.join(os.getcwd(), "node_modules", ".bin", "vite")
if not os.path.exists(vite):
    print(f"ERROR: vite not found at {vite}", flush=True)
    sys.exit(1)

print(f"[launcher] node  = {node}", flush=True)
print(f"[launcher] vite  = {vite}", flush=True)
print(f"[launcher] LD_LP = {env['LD_LIBRARY_PATH'][:100]}", flush=True)

result = subprocess.run(
    [node, vite, "--port", "5000", "--host", "0.0.0.0"],
    stdout=sys.stdout,
    stderr=sys.stderr,
    env=env,
)
sys.exit(result.returncode)
