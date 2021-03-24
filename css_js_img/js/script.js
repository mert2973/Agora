// Handle errors.
let handleError = function(err){
        console.log("Error: ", err);
};

// Query the container to which the remote stream belong.
let remoteContainer = document.getElementById("remote-container");

// Add video streams to the container.
function addVideoStream(elementId){
        // Creates a new div for every stream
        let streamDiv = document.createElement("div");
        // Assigns the elementId to the div.
        streamDiv.id = elementId;
        // Takes care of the lateral inversion
        streamDiv.style.transform = "rotateY(180deg)";
        // Adds the div to the container.
        remoteContainer.appendChild(streamDiv);
};

// Remove the video stream from the container.
function removeVideoStream(elementId) {
        let remoteDiv = document.getElementById(elementId);
        if (remoteDiv) remoteDiv.parentNode.removeChild(remoteDiv);
};


/*********************/
let client = AgoraRTC.createClient({
    mode: "live",
    codec: "vp8",
});

client.init("485793d15e5f41df912ed1ff3aab643c");
/*******/

//Ask the user to choose a role.
// The value of role can be "host" or "audience".
//Call the Client.setClientRole method and pass in the client role set by the user.
var role = prompt("Enter the role(host or audience)","");
var channel = prompt("Enter a channel name:","");

client.setClientRole(role);

/********/
// Join a channel
client.join(null,channel, null, (uid)=>{
  // Create a local stream
}, handleError);
let localStream = AgoraRTC.createStream({
    audio: true,
    video: true,
});
if(role!="audience"){
    // Initialize the local stream
    localStream.init(()=>{

        // Play the local stream
        localStream.play("me");
        // Publish the local stream
        client.publish(localStream, handleError);
    }, handleError);
}
/*client.join(null,"any-channel",null,(uid)=>{
    let localStream = AgoraRTC.createStream({
        video : true,
        audio : true,
    });
    localStream.init(()=>{
        localStream.play('me');
        client.publish(localStream , handleError);
    },handleError);
}, handleError);  */

/*********/

/***********/
// Subscribe to the remote stream when it is published
client.on("stream-added", function(evt){
    client.subscribe(evt.stream, handleError);
});
// Play the remote stream when it is subsribed
client.on("stream-subscribed", function(evt){
    let stream = evt.stream;
    let streamId = String(stream.getId());
    addVideoStream(streamId);
    stream.play(streamId);
});
/************/

/**********/
// Remove the corresponding view when a remote user unpublishes.
client.on("stream-removed", function(evt){
    let stream = evt.stream;
    let streamId = String(stream.getId());
    stream.close();
    removeVideoStream(streamId);
});
// Remove the corresponding view when a remote user leaves the channel.
client.on("peer-leave", function(evt){
    let stream = evt.stream;
    let streamId = String(stream.getId());
    stream.close();
    removeVideoStream(streamId);
});
/**********/
