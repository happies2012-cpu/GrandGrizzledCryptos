---
name: Nix Node 20 libstdc++ CXXABI_1.3.15 workaround
description: Node 20 in this Nix/Ubuntu environment fails to start because the Nix cpplibs libstdc++.so.6 is missing CXXABI_1.3.15 required by icu4c-76. Ubuntu system libstdc++ has it.
---

## The Problem

When the workflow runs `npm run dev` or `node <script>`, it fails immediately with:

```
/nix/store/.../nodejs-20.20.0/bin/node: .../cpplibs/lib/libstdc++.so.6:
version `CXXABI_1.3.15' not found (required by .../icu4c-76.1/lib/libicui18n.so.76)
```

The Nix "wrapped" node binary sets `LD_LIBRARY_PATH` from `$REPLIT_LD_LIBRARY_PATH`, which points to the Nix cpplibs. That libstdc++ only goes up to CXXABI_1.3.14. The icu4c-76 package requires 1.3.15.

**Why:** The `.replit` file uses `channel = "stable-21_11"` (NixOS 21.11, circa 2021) but installs nodejs-20 which was released later and requires a newer C++ ABI via icu4c-76.

## The Fix

In `app.py`, before launching node, create `/tmp/libstdc_compat/libstdc++.so.6` as a symlink to `/usr/lib/x86_64-linux-gnu/libstdc++.so.6` (Ubuntu system library, which has CXXABI_1.3.15), then prepend that directory to `LD_LIBRARY_PATH`.

Do **NOT** prepend the full `/usr/lib/x86_64-linux-gnu` — this breaks the Nix bash wrapper with a `__vdso_time: invalid mode for dlopen()` error.

**How to apply:** Any time a Node.js script fails with CXXABI_1.3.15 not found in this environment, use this same isolated-symlink pattern in the launcher.
