import imgUrl1 from  '../assets/images/onboarding-image-1.png'
import imgUrl2 from  '../assets/images/onboarding-image-2.png'
import imgUrl3 from  '../assets/images/onboarding-image-3.png'

let count = 0;

class Onboard{
  constructor(title,description,imgUrl){
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
    this.id = count + 1;
    count++;
  }
}


const data = [
  new Onboard('Helping Communities','We aim to connect and enable communities using our aggregated gateways to deliver financial support instantly',imgUrl1),
  new Onboard('Send money to family','We aim to connect and enable communities using our aggregated gateways to deliver financial support instantly',imgUrl2),
  new Onboard('Trusted by millions','We aim to connect and enable communities using our aggregated gateways to deliver financial support instantly',imgUrl3),
]


// console.log(data);

export default data;