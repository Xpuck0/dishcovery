

export default function checkImageExists(url)  {
    var img = new Image();
    img.onload = function() {
        return true;
    };
    img.onerror = function() {
        return false;
    };
    img.src = url;
}
