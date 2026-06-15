#!/usr/bin/env bash
#
# Convex installer for end users (macOS/Linux).
# Downloads the latest convex.jar and creates a 'convex' command on PATH.
#
# SYNC: canonical source is convex repo scripts/install.sh — keep in sync.
#
# Usage:
#   curl -fsSL https://convex.world/install.sh | bash
#
# Options (environment variables):
#   CONVEX_VERSION=0.8.3    Install a specific version (default: latest)
#   CONVEX_HOME=~/.convex   Installation directory (default: ~/.convex)

set -euo pipefail

CONVEX_HOME="${CONVEX_HOME:-$HOME/.convex}"
CONVEX_JAR="$CONVEX_HOME/convex.jar"
MIN_JAVA_VERSION=21
REPO="Convex-Dev/convex"

# ── Helpers ──────────────────────────────────────────────

info()  { printf '  %s\n' "$*"; }
ok()    { printf '  \033[32m✓\033[0m %s\n' "$*"; }
warn()  { printf '  \033[33m!\033[0m %s\n' "$*"; }
fail()  { printf '  \033[31m✗\033[0m %s\n' "$*"; exit 1; }

path_contains() {
    case ":$PATH:" in
        *":$1:"*) return 0 ;;
        *) return 1 ;;
    esac
}

is_writable_dir() {
    [ -d "$1" ] && [ -w "$1" ]
}

# ── Check Java ───────────────────────────────────────────

check_java() {
    if ! command -v java &>/dev/null; then
        fail "Java not found. Please install Java $MIN_JAVA_VERSION or later."
    fi

    # Parse version from "java -version" (works with Oracle, OpenJDK, Temurin, etc.)
    local version
    version=$(java -version 2>&1 | head -1 | sed -E 's/.*"([0-9]+).*/\1/')

    if [ -z "$version" ] || [ "$version" -lt "$MIN_JAVA_VERSION" ] 2>/dev/null; then
        fail "Java $MIN_JAVA_VERSION+ required, found Java $version."
    fi

    ok "Java $version"
}

# ── Determine download URL ───────────────────────────────

get_download_url() {
    if [ -n "${CONVEX_VERSION:-}" ]; then
        echo "https://github.com/$REPO/releases/download/$CONVEX_VERSION/convex.jar"
    else
        echo "https://github.com/$REPO/releases/latest/download/convex.jar"
    fi
}

# ── Download ─────────────────────────────────────────────

download() {
    local url
    url=$(get_download_url)
    local tmp_jar="$CONVEX_JAR.tmp"

    mkdir -p "$CONVEX_HOME"

    info "Downloading from $url ..."

    if command -v curl &>/dev/null; then
        curl -fSL --progress-bar -o "$tmp_jar" "$url"
    elif command -v wget &>/dev/null; then
        wget -q --show-progress -O "$tmp_jar" "$url"
    else
        fail "Neither curl nor wget found. Please install one."
    fi

    mv "$tmp_jar" "$CONVEX_JAR"
    ok "Downloaded convex.jar"
}

# ── Create wrapper script ────────────────────────────────

install_wrapper() {
    # Find a writable directory on PATH.
    local bin_dir=""
    for dir in "$HOME/.local/bin" "$HOME/bin" "/usr/local/bin"; do
        if is_writable_dir "$dir" && path_contains "$dir"; then
            bin_dir="$dir"
            break
        fi
    done

    # Fall back to ~/.local/bin and create it
    if [ -z "$bin_dir" ]; then
        bin_dir="$HOME/.local/bin"
        mkdir -p "$bin_dir"
    fi

    if ! is_writable_dir "$bin_dir"; then
        fail "$bin_dir is not writable. Create a writable bin directory or add one to PATH."
    fi

    local wrapper="$bin_dir/convex"

    cat > "$wrapper" <<SCRIPT
#!/usr/bin/env bash
exec java -jar "$CONVEX_JAR" "\$@"
SCRIPT
    chmod +x "$wrapper"

    ok "Installed 'convex' command to $wrapper"

    # Check if bin_dir is on PATH
    if ! path_contains "$bin_dir"; then
        warn "$bin_dir is not on your PATH. Add it with:"
        info "  export PATH=\"$bin_dir:\$PATH\""
    fi
}

# ── Verify ───────────────────────────────────────────────

verify() {
    if [ -f "$CONVEX_JAR" ]; then
        ok "Installed to $CONVEX_JAR"
    else
        fail "Installation failed — convex.jar not found."
    fi
}

# ── Main ─────────────────────────────────────────────────

main() {
    echo ""
    echo "  Convex Installer"
    echo "  ─────────────────"
    echo ""

    check_java
    download
    install_wrapper
    verify

    echo ""
    info "Run 'convex --help' to get started."
    echo ""
}

main
