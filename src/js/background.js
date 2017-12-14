import '../img/logo.png'

chrome.runtime.onConnectExternal.addListener((port, tab) => {
	const notification = {
		type: 'basic',
		iconUrl: 'logo.png',
		title: 'Title',
		message: 'Message',
	}

	// messages sent from iframe to extension prompting action
	port.onMessage.addListener((message) => {
		if (message === 'show-rich-notification'){
			chrome.notifications.create(notification, (res) => console.log(res))
		}
		if (message === 'add-element-to-page'){
			const action = 'document.firstElementChild.prepend(document.createElement(`span`));'
			chrome.tabs.executeScript({
				code: action
			});
		}
		if (message === 'change-parent-page-color'){
			const action = 'window.document.body.style.backgroundColor="red"'
			chrome.tabs.executeScript({
				code: action
			});
		}
	});

	// messages sent from extension to iframe prompting action in frame
	chrome.browserAction.onClicked.addListener(() => {
		port.postMessage('from extension');
	});
});