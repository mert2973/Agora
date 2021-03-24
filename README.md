# Agora

liveStream :
 1- index.html sayfasında kullanılan cdn yerine node_modules/agora-rtc-sdk/AgoraRTCSDK.min.js sdk dosyası kullanılabilir.
 2- "liveStream/css_js_img/js/script.js" script dosyasındaki fonksiyonda "client.init(...)" App ID parametre olarak yazılıdır.
 3- "liveStream/css_js_img/js/script.js" dasyasında kullanıcı rol'ü için "host" veya "audience" olmalıdır. her hangi bir kanal adı parametre olarak gönderilebilir.
    * host     :  konuşmacı olarak tanımlanabilir. 
    * audience :  ziyaretçi olarak tanımlanabilir. 
4. Bu demo ile birebir video görüşme ve var olan görüşmeye birden çok ziyaretçi katılabilir.
