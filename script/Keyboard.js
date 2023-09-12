

class Keyboard{


    constructor(letters,className_currentLetter,className_greenLetter,className_errorLetter){
        this.letters=letters;
        this.start=false;
        this.time=0;
        this.countCharactere= this.letters.length;
        this.typingError= 0;
        this.currentLetterClass=className_currentLetter;
        this.letterGreenCLass=className_greenLetter;
        this.letterErrorCLass= className_errorLetter;
        this.boundCheckInput = this.check_input.bind(this);
        this.keyup_event();
    }

    keyup_event(){
        document.addEventListener("keydown",this.boundCheckInput);
    }

    remove_keyup_event(){
        document.removeEventListener("keydown",this.boundCheckInput);
    }

    check_input(event){

        if(this.start == false){
            this.start=true;
            this.timer();
        }

        

        this.letters.then(function(letters){

            for(let i = 0; i < letters.length; i++){

              if(letters[i].classList.contains(this.currentLetterClass)){

                if(event.key == "Dead"){
                    break;
                }
                
                if(event.key == letters[i].textContent){
                   
                    if(letters[i].classList.contains(this.letterErrorCLass)){
                        letters[i].classList.remove(this.letterErrorCLass);
                    }

                    letters[i].classList.remove(this.currentLetterClass);

                    letters[i].classList.add(this.letterGreenCLass);

                   
                   
                    if(i == letters.length -1 ){
                        this.start=false;
                        this.remove_keyup_event();
                        this.timer();
                        this.score(letters.length);
                    }

                    if(letters[i + 1 ] != undefined){

                        letters[i + 1].classList.add(this.currentLetterClass);
                    }
                    
                    
                    break;
                }
                else{
                    
                    this.typingError++;
                    letters[i].classList.add(this.letterErrorCLass);
                    break;
                    
                }
                
              }
            }
          
            
        }.bind(this))


    }


    timer(){

        let start_chrono= setInterval(function(){

            if(this.start == false){
                clearInterval(start_chrono);
            }

            console.log(this.time);
            this.time++;

        }.bind(this), 1000);  

    }


    score(lettersLength){

        const precision= 100 * (lettersLength - this.typingError) / lettersLength;
        

        const wordPerMinute= (lettersLength / ((this.time / 60) * 6)).toString().split(".")[0];


        if(this.time >= 60){
            this.time= (this.time/60).toString().split(".")[0] + " min " + this.time%60 + " sec";
        }else{
            this.time=this.time + " sec";
        }

        const data={
            time: this.time,
            wordPerMinute: wordPerMinute,
            precision: precision.toFixed(2)+"%",
            lettersLength: lettersLength,
            typingError: this.typingError
        }


        this.time=0;
        this.typingError=0;
        this.start=false;


        this.update_DOM(data)
        

    }

    update_DOM(data){


        document.getElementById("time").textContent=data.time;
        document.getElementById("word_per_min").textContent=data.wordPerMinute;
        document.getElementById("precision").textContent=data.precision;
        document.getElementById("char_length").textContent=data.lettersLength;
        document.getElementById("typing_error_count").textContent=data.typingError;
        document.getElementById("container_result").style.opacity="1";

    }

}