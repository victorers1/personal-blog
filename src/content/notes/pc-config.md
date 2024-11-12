---
title: 'PC Configuration Files'
description: "In case I exchange my PC"
pubDate: 'Jul 01 2022'
updatedDate: 'Jul 01 2022'
heroImage: '/docker-gradient.png'
---

## Intro

These are my config files for some of the programs I use. This should be useful when I change my PC.

## Oh-my-posh Profile

Configured Theme and aliases in order to make it look like Linux shell with oh-my-zhs.

```text
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/peru.omp.json" | Invoke-Expression

function headFunction {
 if ($MyInvocation.ExpectingInput) { # Pipeline input present
  # $Input passes the collected pipeline input through
  $Input | Select-Object -First 10
   }
}
function tailFunction {
 if ($MyInvocation.ExpectingInput) { # Pipeline input present
  # $Input passes the collected pipeline input through
  $Input | Select-Object -Last 10
   }
}

function flFunction { flutter $args }
function flgetFunction { flutter pub get $args }
function flcFunction { flutter clean $args }
function fldFunction { flutter doctor $args }

function gclFunction { git clone $args }
function gcoFunction { git checkout $args }
function gbFunction { git branch $args }
function gstFunction { git status }
function gloFunction { git log --oneline }
function gaFunction { git add $args}
function gcFunction { git commit $args}
function glFunction { git pull $args}
function gpFunction { git push $args }
function gdFunction { git diff $args }
function gmFunction { git merge $args }
function gstaFunction { git stash $args }
function gstlFunction { git stash list $args }
function gstdFunction { git stash drop $args }

New-Alias head headFunction
New-Alias tail tailFunction

Remove-Item alias:fl -Force
New-Alias fl flFunction
New-Alias flget flgetFunction
New-Alias flc flcFunction
New-Alias fld fldFunction

New-Alias gcl gclFunction
New-Alias gco gcoFunction
New-Alias gb gbFunction
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
Remove-Item alias:gm -Force
New-Alias gm gmFunction
New-Alias gsta gstaFunction
New-Alias gstl gstlFunction
New-Alias gstd gstdFunction

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

## Android Studio VSCode keymap

```xml
<keymap version="1" name="VSCode (macOS) copy" parent="VSCode OSX">
  <action id="CloseAllEditorsButActive">
    <keyboard-shortcut first-keystroke="shift meta w" />
  </action>
  <action id="CloseProject">
    <keyboard-shortcut first-keystroke="meta k" second-keystroke="f" />
  </action>
  <action id="CodeCompletion">
    <keyboard-shortcut first-keystroke="alt escape" />
    <keyboard-shortcut first-keystroke="meta space" />
  </action>
  <action id="DuplicatesForm.SendToLeft" />
  <action id="EditorCloneCaretAbove">
    <keyboard-shortcut first-keystroke="meta up" />
  </action>
  <action id="EditorCloneCaretBelow">
    <keyboard-shortcut first-keystroke="meta down" />
  </action>
  <action id="EditorLineEnd">
    <keyboard-shortcut first-keystroke="ctrl e" />
    <keyboard-shortcut first-keystroke="end" />
  </action>
  <action id="EditorLineEndWithSelection">
    <keyboard-shortcut first-keystroke="shift end" />
  </action>
  <action id="EditorLineStart">
    <keyboard-shortcut first-keystroke="ctrl a" />
    <keyboard-shortcut first-keystroke="home" />
  </action>
  <action id="EditorLineStartWithSelection">
    <keyboard-shortcut first-keystroke="shift home" />
  </action>
  <action id="EditorNextWord">
    <keyboard-shortcut first-keystroke="meta right" />
  </action>
  <action id="EditorNextWordWithSelection">
    <keyboard-shortcut first-keystroke="shift meta right" />
  </action>
  <action id="EditorPreviousWord">
    <keyboard-shortcut first-keystroke="meta left" />
  </action>
  <action id="EditorPreviousWordWithSelection">
    <keyboard-shortcut first-keystroke="shift meta left" />
  </action>
  <action id="EditorTextEnd" />
  <action id="EditorTextStart" />
  <action id="Exit" />
  <action id="ExternalSystem.ProjectRefreshAction" />
  <action id="FileChooser.GoToParent" />
  <action id="FileChooser.GotoHome" />
  <action id="Flutter.JumpToSource" />
  <action id="GotoAction">
    <keyboard-shortcut first-keystroke="f1" />
    <keyboard-shortcut first-keystroke="shift meta p" />
  </action>
  <action id="Kotlin.NewFile">
    <keyboard-shortcut first-keystroke="meta 1" />
  </action>
  <action id="MoveLineDown">
    <keyboard-shortcut first-keystroke="ctrl down" />
  </action>
  <action id="MoveLineUp">
    <keyboard-shortcut first-keystroke="ctrl up" />
  </action>
  <action id="QuickImplementations">
    <keyboard-shortcut first-keystroke="alt f12" />
  </action>
  <action id="RecentFiles" />
  <action id="ReformatCode">
    <keyboard-shortcut first-keystroke="shift alt f" />
    <keyboard-shortcut first-keystroke="meta i" />
  </action>
  <action id="SaveAll">
    <keyboard-shortcut first-keystroke="meta alt s" />
    <keyboard-shortcut first-keystroke="meta k" second-keystroke="meta s" />
  </action>
  <action id="SwitcherIterateItems" />
  <action id="SwitcherRecentEditedChangedToggleCheckBox" />
  <action id="Table-selectFirstRow" />
  <action id="Terminal.ClearBuffer">
    <keyboard-shortcut first-keystroke="meta l" />
  </action>
  <action id="Terminal.SelectBlockAbove">
    <keyboard-shortcut first-keystroke="up" />
  </action>
  <action id="Terminal.SelectLastBlock" />
  <action id="Terminal.SelectPrompt" />
  <action id="Tree-selectFirst" />
  <action id="UsageView.Include" />
  <action id="android.deploy.ApplyChanges">
    <keyboard-shortcut first-keystroke="ctrl meta e" />
  </action>
  <action id="android.deploy.CodeSwap">
    <keyboard-shortcut first-keystroke="shift ctrl meta e" />
  </action>
  <action id="android.device.overview.button" />
  <action id="org.intellij.plugins.markdown.ui.actions.styling.ToggleItalicAction" />
</keymap>
```
