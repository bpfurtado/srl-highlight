# SRL Highlight

**SRL Highlight** is a Visual Studio Code extension that provides syntax highlighting for the **Structured Rule Language (SRL)**. This extension is designed to improve code readability and assist developers in writing SRL with visual cues for keywords, operators, data types, and more.

## Features

-   Syntax highlighting for SRL keywords, operators, and data types.
-   Highlights:
    -   **Keywords**: `if`, `while`, `return`, etc.
    -   **Data Types**: `string`, `integer`, `real`, `date`, `boolean`.
    -   **Constants**: `true`, `false`, `null`, `known`, `unknown`, `available`, `unavailable`.
    -   **Comments**: Single-line (`//`) and multi-line (`/* ... */`).
    -   **Strings**: Double-quoted strings with escape sequences.
    -   **Numbers**: Integer and real numbers.
    -   **Date Formats**: Special syntax for date formats like `'01/01/1900'`.
    -   **Operators**: Logical (`and`, `or`, `not`) and comparison operators (`==`, `!=`, `<`, `<=`, `>`, `>=`).
    -   **Function Calls** and **Field Access**: Highlighting for function calls and attribute access (e.g., `object.field`).

## Installation

### From the Visual Studio Marketplace

1. Open Visual Studio Code.
2. Go to the Extensions view (`Ctrl+Shift+X`).
3. Search for **SRL Highlight**.
4. Click **Install**.

### Manual Installation

1. Download the `.vsix` file from the [Releases](#) page.
2. Open Visual Studio Code.
3. Go to the Extensions view (`Ctrl+Shift+X`).
4. Click the `...` (More Actions) button in the top right corner.
5. Select **Install from VSIX...** and choose the downloaded file.

## Usage

1. Open a file with the `.srl` extension, or create a new file with this extension.
2. The extension will automatically apply syntax highlighting to SRL code.
3. Customize your theme if needed to adjust how SRL syntax is visually represented.

## Syntax Details

### Keywords

Highlighted control flow and reserved keywords:

-   `if`, `while`, `for`, `return`, `then`, `increment`, `each`, `catch`, `try`, `is`, etc.

### Data Types

Native SRL data types:

-   `string`, `integer`, `real`, `date`, `boolean`.

### Constants

Supported constants:

-   `true`, `false`, `null`, `known`, `unknown`, `available`, `unavailable`.

### Operators

Logical and comparison operators:

-   Logical: `and`, `or`, `not`.
-   Comparison: `<`, `<=`, `>`, `>=`, `==`, `!=`, `+`, `-`, `/`, `*`.

### Comments

-   **Single-line**: `// This is a comment`
-   **Multi-line**:
    ```srl
    /*
     This is a
     multi-line comment
    */
    ```
