var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
function nextSequence()
{
    var randomNumber=Math.random();
    randomNumber=randomNumber*4;
    randomNumber=Math.floor(randomNumber);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    // selection the button with h jquery with id same as randomChosenColour
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    //updating the h1
    level=level+1;
    $("#level-title").text("Level "+level);

   
}
//Detecting if a button is clicked by the user
$(".btn").click(function()
{
 var userChosenColour=  this.id;
 userClickedPattern.push(userChosenColour);
 playSound(userChosenColour);
 animatePress(this.id);
 checkAnswer(level);
 
});
//Function for playeing sound
function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
//Adding class for background animation
function animatePress(name)
{
    $("#"+name).addClass("pressed");
    setTimeout(function(){
        $("#"+name).removeClass("pressed");
    },100);
}
//Keypress lisstern to start the game
$(document).keypress(function(){
    if(started===false)
    {
        nextSequence();
        started=true;
    }

});

//Making the logic for user anser
function checkAnswer(currentLevel)
{
    var ans=true;
    if(userClickedPattern.length===currentLevel)
    {
        if(userClickedPattern[userClickedPattern.length-1]!==gamePattern[currentLevel-1])
        {
            ans=false;
        }
        else{
            userClickedPattern=[];
            setTimeout(function(){nextSequence();},1000);
        }
    }
    for(let i=0;i<userClickedPattern.length;i++)
    {
        if(userClickedPattern[i]!==gamePattern[i])
        {
            ans=false;
            break;
        }
    }
    if(ans==false)
    {
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        var gameover=new Audio("sounds/wrong.mp3");
        gameover.play();
        $("h1").text("Press any Key to continue");
       setTimeout(function(){startOver();},1000);
       
      

    }

}
function startOver()
{
    level=0;
    started=false;
    gamePattern=[];
    userClickedPattern=[];
//Keypress lisstern to start the game
$(document).keypress(function(){
    if(started===false)
    {
        nextSequence();
        started=true;
    }

});

}