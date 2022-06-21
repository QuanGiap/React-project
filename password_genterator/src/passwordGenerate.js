export default function generatePass(length,haveNum=false,capLetter=false,symbol=false){
    function generateNumberMultRange(array){
        for(let j = 0;j<array.length;j++){
            if(j==array.length-1){
                return Math.floor(Math.random()*(array[j][1] - array[j][0]+1))+array[j][0];
            }
            if(Math.random()>0.5) continue;
            return Math.floor(Math.random()*(array[j][1] - array[j][0]+1))+array[j][0];
        }
        return -1;
    }
    function generateChoice(){
        if(haveNum && Math.floor(Math.random()*2)===1) return 1; 
        if(capLetter && Math.floor(Math.random()*2)===1) return 2; 
        if(symbol && Math.floor(Math.random()*2)===1) return 3; 
        return 0;
    }
    let pass = "";
    for(let i = 0;i<length;i++){
        let num = -1;
        let choice = generateChoice();
        switch(choice){
            case 1:
                num=generateNumberMultRange([[48,57]]);
                break;
            case 2: 
                num=generateNumberMultRange([[65,90]]);
                break;
            case 3: 
                num=generateNumberMultRange([[33,47],[58,64],[94,96],[123,126]]);
                break;
            default: num=generateNumberMultRange([[97,122]]);
        }
        pass+=String.fromCharCode(num);
    }
    return pass;
}