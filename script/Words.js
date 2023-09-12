class Words{

    constructor(url, countWords, container, className_currentLetter, className_blackLetter){
        this.url=url;
        this.countWords=countWords;
        this.container= document.getElementById(container);
        this.letterBlackClass=className_blackLetter;
        this.currentLetterClass=className_currentLetter;
        this.data= [];
        this.letters=[];
    }



    getWordsFromApi(){


    return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            req.open("GET", this.url + this.countWords);

            req.onload = () => {
                if (req.status === 200) {
                    const data = JSON.parse(req.responseText);

                    data.forEach(word => {
                        this.data.push(word.name);
                    });

                    resolve();
                } else {
                    reject("Error fetching data");
                }
            }

            req.send();
        });

    }


    async generateWords(){

        this.data= [];

        await this.getWordsFromApi();


        this.data.forEach(function(word,index){

            
            for(let i = 0; i < word.length; i++){
                
                const spanElt=document.createElement("span");

                if(index == 0 && i == 0){
                    spanElt.classList.add(this.currentLetterClass);
                }else{
                    spanElt.classList.add(this.letterBlackClass);

                }

                spanElt.textContent=word[i];

                this.container.appendChild(spanElt);

                this.letters.push(spanElt);

                if(i == word.length -1 && index !== this.data.length - 1 ){

                    const space=document.createElement("span");
                    space.textContent=" ";
                    this.letters.push(space);
                    this.container.appendChild(space);
                }

                

            }    

        }.bind(this))


    }


    async getLetters(){

        await this.generateWords();

        return this.letters;
    }

}