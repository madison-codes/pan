# 🍳  [Pan](https://en.wikipedia.org/wiki/Pan_(moon))  🌙
## Chrome Extension/ Iframe experiment

This project is a proof of concept showing an open communication channel between an extension and an iframe. The application takes advantage of [message passing](https://developer.chrome.com/extensions/messaging), using the [`runtime.connect` API](https://developer.chrome.com/extensions/runtime#method-connect) to open up a port between the extension and the iframe.Once the port is open, messages can be passed from either side. 

This app uses the open port to:

1. send a message from the iframe to the extension. This action prompts the page that encapsulates the iframe to change its background color to red.
2. send a message from the iframe to an extension. The action prompts a span element to be appended to the parentpage.
3. send a message from the extension to the iframe that prompts the background of the application in the iframe to turn blue.
4. send message from frame to extension and prompts a [rich notification](https://developer.chrome.com/extensions/richNotifications) using the [notification](https://developer.chrome.com/apps/notifications) API.

## Getting Started

### Load the Extension

1. Clone the repository.
2. Install [yarn](https://yarnpkg.com): `npm install -g yarn`.
3. Run `yarn start`.
4. Add your domain to the `externally_connectable` section in your `manifest.json` file.
5. Load your extension on Chrome following:
    a. Access `chrome://extensions/`
    b. Check `Developer mode`
    c. Click on `Load unpacked extension`
    d. Select the `build` folder.
6. Load the parent application (see below)
7. Happy hacking!

### Load the App & iFrame

Load your parent app up an running. The parent app used for this experiment in IronCore's case is [Ironweb](https://github.com/IronCoreLabs/ironweb).

1. Create a new endpoint to serve your frame:

```
  app.get('/sample-extension', (req, res) => {
      res.type('text/html');
      res.status(200).send(
          `<!DOCTYPE html><html lang="en" style="height:100%">
          <head>
              <meta charset="utf-8">
          </head>
          <body style="height:100%">
              <iframe src="https://dev1.scrambledbits.org:4500" width="100%" height="100%"/>
          </body>
          </html>`
      );
  });
```
2. Use to the `runtime.connect` API to initiate a connection between the app and the extension.
`(window as any).chrome.runtime.connect("<extension_id>");`
3. Fill in application id.
    a. Access `chrome://extensions/`
    b. Check `Developer mode`
    c. Click on `Load unpacked extension`
    d. Select the `build` folder.
    e. Find id listed on extension page.
    
 ![group](https://user-images.githubusercontent.com/19200284/34009861-c0751974-e0c7-11e7-8884-0926c67c8442.jpg)
 
 
4. The `runtime.connect` call will return a Port that allows you send and receive messages.

#### Reveive Messages
  1. Add message listener to port `port.onMessage.addListener` which takes a callback.
  2. Execute response script in the callback:

```
  port.onMessage.addListener(() => {
      (document.body.firstElementChild!.firstElementChild as any).style.backgroundColor = "blue";
  });
```
#### Send Messages
  1. Call postMessage method on the port. This takes a string of the message to be transmitted.

```
port.postMessage('show-rich-notification');
```

-------------
Madison Kerndt ~ [@mkerndt](https://twitter.com/mkerndt) ~ [Blog](https://medium.com/@mkerndt)
