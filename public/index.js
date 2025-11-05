import * as BareMux from "https://cdn.jsdelivr.net/gh/AerialiteLabs/tinyjet-frontend@latest/tinyjet/index.mjs"; /* Modified https://cdn.jsdelivr.net/npm/@mercuryworkshop/bare-mux@2.1.7/dist/index.mjs, allows using data urls */

"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("sj-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("sj-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("sj-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("sj-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("sj-error-code");

const { ScramjetController } = $scramjetLoadController();

const scramjet = new ScramjetController({
	files: {
        wasm: "https://cdn.jsdelivr.net/gh/AerialiteLabs/tinyjet-frontend@latest/tinyjet/wasm.wasm", 
        all: "https://cdn.jsdelivr.net/gh/AerialiteLabs/tinyjet-frontend@latest/tinyjet/scramjet.all.js", 
        sync: "https://cdn.jsdelivr.net/gh/AerialiteLabs/tinyjet-frontend@latest/tinyjet/scramjet.sync.js" 
    }
});

scramjet.init();

const bareworker = `data:application/javascript;base64,IWZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2NvbnN0IGU9TWVzc2FnZVBvcnQucHJvdG90eXBlLnBvc3RNZXNzYWdlO2xldCB0PW51bGw7ZnVuY3Rpb24gYShlLHQsYSl7Y29uc29sZS5lcnJvcihgZXJyb3Igd2hpbGUgcHJvY2Vzc2luZyAnJHthfSc6IGAsdCksZS5wb3N0TWVzc2FnZSh7dHlwZToiZXJyb3IiLGVycm9yOnR9KX1hc3luYyBmdW5jdGlvbiBuKGEsbixzKXtjb25zdCBvPWF3YWl0IHMucmVxdWVzdChuZXcgVVJMKGEuZmV0Y2gucmVtb3RlKSxhLmZldGNoLm1ldGhvZCxhLmZldGNoLmJvZHksYS5mZXRjaC5oZWFkZXJzLG51bGwpO2lmKCFmdW5jdGlvbigpe2lmKG51bGw9PT10KXtjb25zdCBhPW5ldyBNZXNzYWdlQ2hhbm5lbCxuPW5ldyBSZWFkYWJsZVN0cmVhbTtsZXQgczt0cnl7ZS5jYWxsKGEucG9ydDEsbixbbl0pLHM9ITB9Y2F0Y2goZSl7cz0hMX1yZXR1cm4gdD1zLHN9cmV0dXJuIHR9KCkmJm8uYm9keSBpbnN0YW5jZW9mIFJlYWRhYmxlU3RyZWFtKXtjb25zdCBlPW5ldyBSZXNwb25zZShvLmJvZHkpO28uYm9keT1hd2FpdCBlLmFycmF5QnVmZmVyKCl9by5ib2R5IGluc3RhbmNlb2YgUmVhZGFibGVTdHJlYW18fG8uYm9keSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyP2UuY2FsbChuLHt0eXBlOiJmZXRjaCIsZmV0Y2g6b30sW28uYm9keV0pOmUuY2FsbChuLHt0eXBlOiJmZXRjaCIsZmV0Y2g6b30pfWxldCBzPW51bGwsbz0iIjtmdW5jdGlvbiBjKCl7cmV0dXJuIG5ldyBFcnJvcigidGhlcmUgYXJlIG5vIGJhcmUgY2xpZW50cyIse2NhdXNlOiJObyBCYXJlVHJhbnNwb3J0IHdhcyBzZXQuIFRyeSBjcmVhdGluZyBhIEJhcmVNdXhDb25uZWN0aW9uIGFuZCBjYWxsaW5nIHNldFRyYW5zcG9ydCgpIG9yIHNldE1hbnVhbFRyYW5zcG9ydCgpIG9uIGl0IGJlZm9yZSB1c2luZyBCYXJlQ2xpZW50LiJ9KX1mdW5jdGlvbiByKHQsYSl7Y29uc3Qgbj1zO2xldCBvPVthXTt0LmZldGNoPy5ib2R5JiZvLnB1c2godC5mZXRjaC5ib2R5KSx0LndlYnNvY2tldD8uY2hhbm5lbCYmby5wdXNoKHQud2Vic29ja2V0LmNoYW5uZWwpLGUuY2FsbChuLHttZXNzYWdlOnQscG9ydDphfSxvKX1mdW5jdGlvbiBsKHQpe3Qub25tZXNzYWdlPWFzeW5jIHQ9Pntjb25zdCBsPXQuZGF0YS5wb3J0LGk9dC5kYXRhLm1lc3NhZ2U7aWYoInBpbmciPT09aS50eXBlKWUuY2FsbChsLHt0eXBlOiJwb25nIn0pO2Vsc2UgaWYoInNldCI9PT1pLnR5cGUpdHJ5e2NvbnN0IHQ9YXN5bmMgZnVuY3Rpb24oKXt9LmNvbnN0cnVjdG9yO2lmKCJiYXJlLW11eC1yZW1vdGUiPT09aS5jbGllbnQuZnVuY3Rpb24pcz1pLmNsaWVudC5hcmdzWzBdLG89YGJhcmUtbXV4LXJlbW90ZSAoJHtpLmNsaWVudC5hcmdzWzFdfSlgO2Vsc2V7Y29uc3QgZT1uZXcgdChpLmNsaWVudC5mdW5jdGlvbiksW2Esbl09YXdhaXQgZSgpO3M9bmV3IGEoLi4uaS5jbGllbnQuYXJncyksbz1ufWNvbnNvbGUubG9nKCJzZXQgdHJhbnNwb3J0IHRvICIscyxvKSxlLmNhbGwobCx7dHlwZToic2V0In0pfWNhdGNoKGUpe2EobCxlLCJzZXQiKX1lbHNlIGlmKCJnZXQiPT09aS50eXBlKWwucG9zdE1lc3NhZ2Uoe3R5cGU6ImdldCIsbmFtZTpvfSk7ZWxzZSBpZigiZmV0Y2giPT09aS50eXBlKXRyeXtpZighcyl0aHJvdyBjKCk7aWYocyBpbnN0YW5jZW9mIE1lc3NhZ2VQb3J0KXJldHVybiB2b2lkIHIoaSxsKTtzLnJlYWR5fHxhd2FpdCBzLmluaXQoKSxhd2FpdCBuKGksbCxzKX1jYXRjaChlKXthKGwsZSwiZmV0Y2giKX1lbHNlIGlmKCJ3ZWJzb2NrZXQiPT09aS50eXBlKXRyeXtpZighcyl0aHJvdyBjKCk7aWYocyBpbnN0YW5jZW9mIE1lc3NhZ2VQb3J0KXJldHVybiB2b2lkIHIoaSxsKTtzLnJlYWR5fHxhd2FpdCBzLmluaXQoKSxhd2FpdCBhc3luYyBmdW5jdGlvbih0LGEsbil7Y29uc3RbcyxvXT1uLmNvbm5lY3QobmV3IFVSTCh0LndlYnNvY2tldC51cmwpLHQud2Vic29ja2V0LnByb3RvY29scyx0LndlYnNvY2tldC5yZXF1ZXN0SGVhZGVycywoYT0+e2UuY2FsbCh0LndlYnNvY2tldC5jaGFubmVsLHt0eXBlOiJvcGVuIixhcmdzOlthXX0pfSksKGE9PnthIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI/ZS5jYWxsKHQud2Vic29ja2V0LmNoYW5uZWwse3R5cGU6Im1lc3NhZ2UiLGFyZ3M6W2FdfSxbYV0pOmUuY2FsbCh0LndlYnNvY2tldC5jaGFubmVsLHt0eXBlOiJtZXNzYWdlIixhcmdzOlthXX0pfSksKChhLG4pPT57ZS5jYWxsKHQud2Vic29ja2V0LmNoYW5uZWwse3R5cGU6ImNsb3NlIixhcmdzOlthLG5dfSl9KSwoYT0+e2UuY2FsbCh0LndlYnNvY2tldC5jaGFubmVsLHt0eXBlOiJlcnJvciIsYXJnczpbYV19KX0pKTt0LndlYnNvY2tldC5jaGFubmVsLm9ubWVzc2FnZT1lPT57ImRhdGEiPT09ZS5kYXRhLnR5cGU/cyhlLmRhdGEuZGF0YSk6ImNsb3NlIj09PWUuZGF0YS50eXBlJiZvKGUuZGF0YS5jbG9zZUNvZGUsZS5kYXRhLmNsb3NlUmVhc29uKX0sZS5jYWxsKGEse3R5cGU6IndlYnNvY2tldCJ9KX0oaSxsLHMpfWNhdGNoKGUpe2EobCxlLCJ3ZWJzb2NrZXQiKX19fW5ldyBCcm9hZGNhc3RDaGFubmVsKCJiYXJlLW11eCIpLnBvc3RNZXNzYWdlKHt0eXBlOiJyZWZyZXNoUG9ydCJ9KSxzZWxmLm9uY29ubmVjdD1lPT57bChlLnBvcnRzWzBdKX0sY29uc29sZS5kZWJ1ZygiYmFyZS1tdXg6IHJ1bm5pbmcgdjIuMS43IChidWlsZCBjNTZkMjg2KSIpfSgpOwovLyMgc291cmNlTWFwcGluZ1VSTD13b3JrZXIuanMubWFw`;
const connection = new BareMux.BareMuxConnection(bareworker);

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	try {
		await registerSW();
	} catch (err) {
		error.textContent = "Failed to register service worker.";
		errorCode.textContent = err.toString();
		throw err;
	}

	const url = search(address.value, searchEngine.value);

	let wispUrl = "wss://gointospace.app/wisp/";
	if ((await connection.getTransport()) !== "https://cdn.jsdelivr.net/npm/@mercuryworkshop/epoxy-transport/dist/index.mjs") {
        await connection.setTransport("https://cdn.jsdelivr.net/npm/@mercuryworkshop/epoxy-transport/dist/index.mjs", [{ wisp: wispUrl }]);
	}
  const frame = scramjet.createFrame();
  frame.frame.id = "sj-frame";
	document.body.appendChild(frame.frame);	
	frame.go(url);
});
