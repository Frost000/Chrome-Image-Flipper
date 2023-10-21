document.addEventListener('DOMContentLoaded', function() {
    buttonAddEventListener();
});
function buttonAddEventListener() {
    document.getElementById("flipX").addEventListener("click", flipHorizontal);
    document.getElementById("flipY").addEventListener("click", flipVertical);

    console.log("Extension DOM Loaded");
}
function injectedHorizontalFlip(){
    const images = document.getElementsByTagName("img");
    for (const image of images) {
        //console.log(image.style.transform);
        image.style.transform += "scaleX(-1)";
    }
}
function flipHorizontal() {
    const activeTab = getCurrentTab();
    activeTab.then(activeTab => {
        console.log(activeTab.id);
        chrome.scripting.executeScript({
            target: {tabId: activeTab.id},
            func: injectedHorizontalFlip,
        }).then(() => console.log("Flipped Horizontal"))
    });
}
function injectedVerticalFlip(){
    const images = document.getElementsByTagName("img");
    for (const image of images) {
        //console.log(image.style.transform);
        image.style.transform += "scaleY(-1)";
    }
}
function flipVertical() {
    const activeTab = getCurrentTab();
    activeTab.then(activeTab => {
        console.log(activeTab.id);
        chrome.scripting.executeScript({
            target: {tabId: activeTab.id},
            func: injectedVerticalFlip,
        }).then(() => console.log("Flipped Vertical"))
    });
}
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}