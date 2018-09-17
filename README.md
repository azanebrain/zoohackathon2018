# Conscious Consumer Chrome Browser Extension

Conscious Consumer is an open source Chrome Browser extension that educates users about sensitive key-terms that relate to conservation issues, and serves as an indicator of product sustainability. 

It helps users by searching ingredients in ecommerce site products.  The extension automatically searches site text and will target and notify the user if any keywords associated with a problematic ingredient is discovered.   

Conscious Consumer has an initial focus on problematic ingredients in food, body, and beauty products.  Once a problematic ingredient is found, the user is notified with a small pop up that contains information on why the ingredient is antagonistic for conservation efforts.

[Visit the website](https://2018zoohackathon.ajzane.com) for more information.

# Setup

* Go to [Chrome Extensions](chrome://extensions)
* Enable Developer mode
* "Load unpacked"

# Architecture

The extension is split into 3 main parts: Background, Popup, and DOM.

You can think of Background as the controller of the extension which is always running and able to facilitate communication between the other two parts.

The Popup is the view that is open when the user clicks the extension icon.

The DOM is the current page, unrelated to the extension, but being used by it.

# Debugging

There are 3 levels of debugging:

* Background: From the Extensions page, click the "inspect views background page"
* Dom: Open the dev tools on the current page
* Popup: Right click on the popup and select "Inspect"

# Libraries
* https://markjs.io/
