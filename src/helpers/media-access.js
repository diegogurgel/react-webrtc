export async function getDisplayStream(){
    return navigator.mediaDevices.getDisplayMedia();
}