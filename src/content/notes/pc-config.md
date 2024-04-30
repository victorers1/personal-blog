---
title: 'PC Configuration Files'
description: "In case I exchange my PC"
pubDate: 'Jul 01 2022'
updatedDate: 'Jul 01 2022'
heroImage: '/docker-gradient.png'
---

## Intro

## Oh-my-posh Profile

Configured Theme and aliases in order to make it look like Linux shell with oh-my-zhs.

```text
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/peru.omp.json" | Invoke-Expression

function headFunction { Select-Object -First 10 }
function tailFunction { Select-Object -Last 10 }
function gstFunction { git status }
function gloFunction { git status --one-line }
function gaFunction { git add $args}
function gcFunction { git commit $args}
function glFunction { git pull $args}
function gpFunction { git push $args }
function gdFunction { git diff $args }

New-Alias head headFunction
New-Alias tail tailFunction
New-Alias gst gstFunction
New-Alias glo gloFunction
New-Alias gd gdFunction
New-Alias ga gaFunction
Remove-Item alias:gc -Force
New-Alias gc gcFunction
Remove-Item alias:gl -Force
New-Alias gl glFunction
Remove-Item alias:gp -Force
New-Alias gp gpFunction
```

## VSCode Config

```json
{
    "workbench.colorCustomizations": {
        "tab.activeBackground": "#02599c",
    },
    "[dart]": {
        "editor.formatOnSave": true,
        "editor.formatOnType": false,
        "editor.selectionHighlight": false,
        "editor.suggest.snippetsPreventQuickSuggestions": false,
        "editor.suggestSelection": "first",
        "editor.tabCompletion": "onlySnippets",
        "editor.wordBasedSuggestions": "matchingDocuments",
        "editor.rulers": [
            {
                "column": 80
            }
        ],
    },
    "markdownlint.config": {
        "default": true,
        "MD013": false,
        "MD024": {
            "siblings_only": true
        }
    },
    "editor.fontLigatures": true,
    "editor.fontFamily": "Liga Menlo, Fira Code, Arial, Times New Roman",
    "editor.renderWhitespace": "trailing",
    "files.trimTrailingWhitespace": true,
    "editor.codeActionsOnSave": {
        "source.fixAll": "never"
    },
    "editor.hover.delay": 1300,
    "dart.previewFlutterUiGuidesCustomTracking": true,
    "dart.previewFlutterUiGuides": true,
    "dart.debugExternalPackageLibraries": false,
    "dart.debugSdkLibraries": false,
    "editor.minimap.renderCharacters": false,
    "editor.minimap.size": "fit",
    "editor.minimap.showSlider": "always",
    "editor.stickyScroll.enabled": true,
    "security.workspace.trust.untrustedFiles": "open",
    "redhat.telemetry.enabled": false,
    "githubPullRequests.queries": [
        {
            "label": "Waiting For My Review",
            "query": "is:open review-requested:${user}"
        },
        {
            "label": "Assigned To Me",
            "query": "is:open assignee:${user}"
        },
        {
            "label": "Created By Me",
            "query": "is:open author:${user}"
        }
    ],
    "[python]": {
        "editor.formatOnType": true
    },
    "javascript.format.enable": false,
    "githubPullRequests.createOnPublishBranch": "never",
    "githubPullRequests.focusedMode": "overview",
    "githubPullRequests.quickDiff": true,
    "workbench.editor.enablePreview": false,
    "githubPullRequests.pullBranch": "never",
    "workbench.editor.tabSizing": "fixed",
    "workbench.editor.tabSizingFixedMaxWidth": 200,
    "git.openRepositoryInParentFolders": "never",
    "workbench.tree.renderIndentGuides": "always",
    "workbench.view.alwaysShowHeaderActions": true,
    "editor.showFoldingControls": "always",
    "diffEditor.experimental.showMoves": true,
    "window.density.editorTabHeight": "compact",
    "workbench.editor.pinnedTabsOnSeparateRow": true,
    "workbench.activityBar.location": "top",
    "workbench.tree.enableStickyScroll": true,
    "terminal.integrated.stickyScroll.enabled": true,
    "cmake.showOptionsMovedNotification": false,
    "cmake.configureOnOpen": false,
    "debug.toolBarLocation": "commandCenter",
    "cSpell.enableFiletypes": [
        "!dart",
        "!json",
        "!jsonc",
        "!yaml"
    ]
}
```

## VSCode Dart snippets

```json
{
 // Place your snippets for dart here. Each snippet is defined under a snippet name and has a prefix, body and
 // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
 // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
 // same ids are connected.
 // Example:
 // "Print to console": {
 //  "prefix": "log",
 //  "body": [
 //   "console.log('$1');",
 //   "$2"
 //  ],
 //  "description": "Log output to console"
 // }
 "EdgeInsets": {
  "prefix": "ei",
  "body": "EdgeInsets.${1:padding}"
 },
 "RouteName": {
  "prefix": "rn",
  "body": "static const String routeName = '/${1:route-name}';"
 },
 "SizedBox Height": {
  "prefix": "sh",
  "body": "SizedBox(height: ${1:height})"
 },
 "SizedBox Width": {
  "prefix": "sw",
  "body": "SizedBox(width: ${1:width})"
 },
 "Theme of context": {
  "prefix": "themeof",
  "body": "Theme.of(context)${1}"
 },
 "MediaQuery of context": {
  "prefix": "mediaof",
  "body": "MediaQuery.of(context)${1}"
 },
 "Import Developer": {
  "prefix": "idev",
  "body": "import 'dart:developer' as dev;"
 },
 "Log Developer": {
  "prefix": "log",
  "body": "dev.log('${1:msg}');"
 },
 "SingleChildScrollView": {
  "prefix": "scsv",
  "body": [
   "SingleChildScrollView(",
   "  child: Column(",
   "    children: [${1:}],",
   "  ),",
   "),"
  ],
 },
 "Mobx @action": {
  "prefix": "act",
  "body": [
   "@action",
   "${3:void} ${1:name}(${2:args}) {",
   "  $0",
   "}"
  ]
 },
 "Scaffold Page": {
  "prefix": "fsa",
  "body": [
   "import 'package:flutter/material.dart';",
   "",
   "class ${1:PageName} extends StatelessWidget {",
   "  const ${1:PageName}({super.key});",
   "",
   "  @override",
   "  Widget build(BuildContext context) {",
   "    return Scaffold(",
   "      appBar: AppBar(title: const Text('${0:title}')),",
   "      body: const Placeholder(),",
   "    );",
   "  }",
   "}",
  ]
 }
}
```
