---
title: 'Devices to take screenshots to AppStoreConnect'
description: ""
pubDate: 'Jul 01 2022'
updatedDate: 'Jul 01 2022'
heroImage: '/docker-gradient.png'
---

## Intro

These are my config files for some of the programs I use. Hope they will never be needed.

## Screens sizes

Updated to XCode 14.

### iPhone 6.7" Display

This is 1290 x 2796 pixels. You can use the following simulators to create these screenshots:

- iPhone 14 Pro Max

### iPhone 6.5" Display

As long as you have iPhone 6.7" screenshots, App Store Connect allows you to omit this one.

This is 1242 x 2688 pixels. You can use the following simulators to create these screenshots:

- iPhone 13 Pro Max
- iPhone 12 Pro Max
- iPhone 11 Pro Max
- iPhone XS Max
- iPhone XR

### iPhone 5.5" Display

This is 1242 x 2208 pixels. You can use the following simulators to create these screenshots:

- iPhone 8 Plus
- iPhone 7 Plus
- iPhone 6s Plus

*Xcode 14 doesn't show these devices by default in the Simulator. In Xcode, go to Window > Devices and Simulators. Chose Simulators and then press the add button to add iPhone 8 Plus to the list.*

### iPad Pro (6th gen) 12.9" Display

That is 2048 x 2732 pixels. You can create this size image using the iPad Pro (12.9-inch) (6th generation) simulator.

### iPad Pro (2nd gen) 12.9" Display

That is 2048 x 2732 pixels. This is the exact same size as the iPad Pro (12.9-inch) (6th generation), so most people can use the same screenshots here. But see this.

Notes:

- Data source: [Official Screenshot specifications](https://help.apple.com/app-store-connect/#/devd274dd925) page on the Apple site. Thanks to [this answer](https://stackoverflow.com/questions/25756589/app-store-connect-screenshots-sizes-for-all-ios-iphone-ipad-apple-watch-device/62241682#62241682) for the link. Not all of the devices listed above produce the exact pixel dimensions listed, but Apple seems to accept the proportions.

- Use **File** > **New Screen Shot** (Command+S) in the simulator to save a screenshot to the desktop. On a real device press Sleep/Wake+Home [on the iPhone/iPad](https://support.apple.com/en-us/102616) (images available in Photo app)

- The pixel dimensions above are the full screen portrait orientation sizes. You shouldn't include the status bar, so you can either paste background color over the status bar text and icons or crop them out and scale the image back up.
