# @payloadcms/ui Documentation Plan

**Overall Goal:** To create comprehensive documentation for the `@payloadcms/ui` package, including a section for each exported UI component, its available props, and information on how they are used together.

**Steps:**

1.  **Scan `@payloadcms/ui`:** Use `list_files` to recursively list all files in `node_modules/@payloadcms/ui/dist`.
2.  **Identify UI Components:** Analyze the file list to identify all exported UI components. This will likely involve looking for files in the `elements` and `fields` directories.
3.  **Create Documentation Structure:** For each identified UI component, create a section in `05_ui_elements.md` with the component name as the heading.
4.  **Document Props and Usage:** For each component, use `read_file` to read the source code and extract the available props and usage information. Add this information to the component's section in `05_ui_elements.md`.
5.  **Other Documentation:** Create the other documentation files (`01_overview.md`, `02_installation.md`, `03_usage.md`, `04_configuration.md`, `06_customization.md`, and `07_api_reference.md`) as planned.
6.  **Verification:** After documenting all identified components, verify that all exported UI components from `@payloadcms/ui` have been documented in `05_ui_elements.md`. **The task is not complete until this verification is successful.**

**Files:**

- `documentation/developer-documentation/@payloadcms/ui/01_overview.md`
  - Introduction to `@payloadcms/ui`
  - Key Features
  - Dependencies
- `documentation/developer-documentation/@payloadcms/ui/02_installation.md`
  - Installation instructions
- `documentation/developer-documentation/@payloadcms/ui/03_usage.md`
  - Basic usage examples
- `documentation/developer-documentation/@payloadcms/ui/04_configuration.md`
  - Configuration options
- `documentation/developer-documentation/@payloadcms/ui/05_ui_elements.md`
  - Documentation for individual UI elements (Button, Collapsible, etc.) - **This file will be dynamically generated based on the scan of `@payloadcms/ui`**
- `documentation/developer-documentation/@payloadcms/ui/06_customization.md`
  - Customizing the UI components
  - Theming
- `documentation/developer-documentation/@payloadcms/ui/07_api_reference.md`
  - (If applicable) Detailed API reference for the components
