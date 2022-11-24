
const uuid = require('uuid').v4
const _ = require('lodash')
const licCop=["대한상공회의소",'한국방송통신전파진흥원','Q-net','한국콘텐츠 진흥원']
const documents=['졸업증명서','성적증명서','경력증명서','자격증 확인서']
let korcham_date=[]//대한상공회의소 발표일
let liclink=[]
let comspe_pri=[]
let signup=[]
let copTel=[]
let contest=[]//대회
let contest_date=[]//대회일정
let con_signup=[]//대회 접수일자
let company=[]//회사 채용공고
let career=[]//회사 요구경력
let coding=[]//회사 요구코딩
let license=[]
let cominfo=[]
let wordinfo=[]
let comAdd=[]
let copName=[]
let needPP=[]

var i=0;
var j=0;
var k=0;
var value=null;

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "clova.cdahd1t32k88.ap-northeast-2.rds.amazonaws.com",//아마존 호스트
  user: "anetfotoa",//데이터베이스 아이디
  password: "a4415588",//데이터베이스 비밀번호
  database: "clova"//데이터베이스 이름
});


class Directive {
  constructor({namespace, name, payload}) {
    this.header = {
      messageId: uuid(),
      namespace: namespace,
      name: name,
    }
    this.payload = payload
  }
}

class CEKRequest {
  constructor (httpReq) {
    this.request = httpReq.body.request
    this.context = httpReq.body.context
    this.session = httpReq.body.session
    console.log(`CEK Request: ${JSON.stringify(this.context)}, ${JSON.stringify(this.session)}`)
  }

  do(cekResponse) {
    switch (this.request.type) {
      case 'LaunchRequest':
        return this.launchRequest(cekResponse)
      case 'IntentRequest':
        return this.intentRequest(cekResponse)
      case 'SessionEndedRequest':
        return this.sessionEndedRequest(cekResponse)
    }
  }

  launchRequest(cekResponse) {
    console.log('launchRequest')
    cekResponse.setSimpleSpeechText('클로바 취업서비스를 시작합니다.')
    cekResponse.setMultiturn({
      intent: 'ThrowDiceIntent',
    })
  }

  intentRequest(cekResponse) {
    console.log('intentRequest')
    console.dir(this.request)
    const intent = this.request.intent.name
    const slots = this.request.intent.slots


    switch (intent) {
    case 'callingIntent'://발화문: 클로바 취업서비스 시작해줘
      cekResponse.setSimpleSpeechText("자격증, 채용정보, 대회 중 무엇으로 도와드릴까요?")
      break;


    case 'licIntent'://전체 자격증
      con.query("SELECT 이름 FROM 자격증",function(err,result,fields){
        if(err) throw err;
          for(i=0;i<result.length;i++){
            license[i]=result[i].이름;
          }
          });
      cekResponse.setSimpleSpeechText("전체 자격증은 "+license+"가 있습니다.")
      break;

    case 'licDayKorchamIntent'://대한상공회의소 시험 발표일 알려줘
    	var value = this.request.intent.slots.name.value
    	con.query("SELECT 발표일자 FROM 자격증 where 이름 like '%"+value+"%' AND 발표일자 IS NOT NULL",function(err,result,fields){
    		if(err) throw err;
    			for(i=0;i<result.length;i++){
    			   korcham_date[i]=result[i].발표일자;
    			}
    	    });

	    cekResponse.setSimpleSpeechText(value+"의 시험 발표일은 "+korcham_date+"입니다");
      break;

      case 'comInfoIntent'://컴퓨터 활용능력 slot 알려줘
      	var value = this.request.intent.slots.cominfo.value
        let cominfo_a=[]
        let cominfo_b=[]
        let cominfo_c=[]
        let cominfo_d=[]
        let cominfo_e=[]
        let cominfo_f=[]
        let cominfo_g=[]
        let cominfo_h=[]
        let cominfo_i=[]
        let cominfo_j=[]
        let cominfo_k=[]
        let cominfo_l=[]
      	con.query("SELECT DISTINCT * FROM 자격증 where 이름 like '%컴퓨터활용능력%' AND "+value+" IS NOT NULL",function(err,result,fields){
      		if(err) throw err;

          if(value=="발표일자"){
      			for(i=0;i<result.length;i++){
      			   cominfo_a[i]=result[i].발표일자;
      			}
          cominfo=cominfo_a;
          }

          if(value=="시험등급"){
      			for(i=0;i<result.length;i++){
      			   cominfo_b[i]=result[i].시험등급;
      			}
          cominfo=cominfo_b;
          }

          if(value=="시험과목"){
      			for(i=0;i<result.length;i++){
      			   cominfo_c[i]=result[i].시험과목;
      			}
          cominfo=cominfo_c;
          }

          if(value=="출제형태"){
      			for(i=0;i<result.length;i++){
      			   cominfo_d[i]=result[i].출제형태;
      			}
          cominfo=cominfo_d;
          }

          if(value=="시험시간"){
      			for(i=0;i<result.length;i++){
      			   cominfo_e[i]=result[i].시험시간;
      			}
            cominfo=cominfo_e;
          }

          if(value=="필기"){
      			for(i=0;i<result.length;i++){
      			   cominfo_f[i]=result[i].필기;
      			}
          cominfo=cominfo_f;
          }

          if(value=="실기"){
      			for(i=0;i<result.length;i++){
      			   cominfo_g[i]=result[i].실기;
      			}
            cominfo=cominfo_g;
          }

          if(value=="필실가격"){
      			for(i=0;i<result.length;i++){
      			   cominfo_h[i]=result[i].필실가격;
      			}
            cominfo=cominfo_h;
          }

          if(value=="입실시간"){
      			for(i=0;i<result.length;i++){
      			   cominfo_i[i]=result[i].입실시간;
      			}
          cominfo=cominfo_i;
          }

          if(value=="시작시간"){
      			for(i=0;i<result.length;i++){
      			   cominfo_j[i]=result[i].시작시간;
      			}
            cominfo=cominfo_j;
          }
          if(value=="인터넷접수"){
      			for(i=0;i<result.length;i++){
      			   cominfo_k[i]=result[i].인터넷접수;
      			}
          cominfo=cominfo_k;
          }
          if(value=="시험일자"){
      			for(i=0;i<result.length;i++){
      			   cominfo_l[i]=result[i].시험일자;
      			}
          cominfo=cominfo_l;
          }
        });
        cekResponse.setSimpleSpeechText("컴퓨터 활용능력의 "+value+"은/는"+cominfo+"입니다");
        break;

      case 'wordInfoIntent'://워드프로세서 slot 알려줘
        	var value = this.request.intent.slots.cominfo.value
          let wordinfo_a=[]
          let wordinfo_b=[]
          let wordinfo_c=[]
          let wordinfo_d=[]
          let wordinfo_e=[]
          let wordinfo_f=[]
          let wordinfo_g=[]
          let wordinfo_h=[]
          let wordinfo_i=[]
          let wordinfo_j=[]
          let wordinfo_k=[]
          let wordinfo_l=[]
        	con.query("SELECT DISTINCT * FROM 자격증 where 이름 like '%워드%' AND "+value+" IS NOT NULL",function(err,result,fields){
        		if(err) throw err;

            if(value=="발표일자"){
        			for(i=0;i<result.length;i++){
        			   wordinfo_a[i]=result[i].발표일자;
        			}
            wordinfo=wordinfo_a;
            }

            if(value=="시험등급"){
        			for(i=0;i<result.length;i++){
        			   wordinfo_b[i]=result[i].시험등급;
        			}
            wordinfo=wordinfo_b;
            }

            if(value=="시험과목"){
        			for(i=0;i<result.length;i++){
        			   wordinfo_c[i]=result[i].시험과목;
        			}
              wordinfo=wordinfo_c;
            }

            if(value=="출제형태"){
        			for(i=0;i<result.length;i++){
        			   wordinfo_d[i]=result[i].출제형태;
        			}
            wordinfo=wordinfo_d;
            }

            if(value=="시험시간"){
        			for(i=0;i<result.length;i++){
        			   wordinfo_e[i]=result[i].시험시간;
        			}
              wordinfo=wordinfo_e;
            }

            if(value=="필기"){
        			for(i=0;i<result.length;i++){
        			   wordinfo_f[i]=result[i].필기;
        			}
            wordinfo=wordinfo_f;
            }

            if(value=="실기"){
        			for(i=0;i<result.length;i++){
        			  wordinfo_g[i]=result[i].실기;
        			}
              wordinfo=wordinfo_g;
            }

            if(value=="필실가격"){
        			for(i=0;i<result.length;i++){
        			   wordinfo_h[i]=result[i].필실가격;
        			}
              wordinfo=wordinfo_h;
            }

            if(value=="입실시간"){
        			for(i=0;i<result.length;i++){
        			  wordinfo_i[i]=result[i].입실시간;
        			}
            wordinfo=wordinfo_i;
            }

            if(value=="시작시간"){
        			for(i=0;i<result.length;i++){
        			   wordinfo_j[i]=result[i].시작시간;
        			}
              wordinfo=wordinfo_j;
            }
            if(value=="인터넷접수"){
        			for(i=0;i<result.length;i++){
        			   wordinfo_k[i]=result[i].인터넷접수;
        			}
            wordinfo=wordinfo_k;
            }
            if(value=="시험일자"){
        			for(i=0;i<result.length;i++){
        			   wordinfo_l[i]=result[i].시험일자;
        			}
            wordinfo=wordinfo_l;
            }
          });
        cekResponse.setSimpleSpeechText("워드프로세서의 "+value+"은/는"+wordinfo+"입니다");
        break;

      case 'copTelIntent'://발화문 : ~~시행처의 고객센터 전화번호 알려줘 (됨)
       var value = this.request.intent.slots.lic_cop_name.value
    	 con.query("SELECT 고객센터 FROM license_info where 회사명 like '%"+value+"%'",function(err,result,fields){
    	      if (err) throw err;
    	        for(i=0;i<result.length;i++){
    	          copTel[i]=result[i].고객센터;
    	        }
    	      });
    	 console.log(copTel);
        cekResponse.setSimpleSpeechText(value+"의 고객센터 전화번호는 "+copTel+"입니다");
        break;



        case 'contestDayIntent'://~~대회의 대회 접수일정 알려줘
           var value = this.request.intent.slots.contest_name.value
           con.query("SELECT 대회이름,접수 FROM 대회 where 대회이름 like '%"+value+"%'",function(err,result,fields){
               if (err) throw err;

                  for(i=0;i<result.length;i++){
                   contest[i]=result[i].대회이름;
                 }
                  for(j=0;j<result.length;j++){
                   con_signup[j]=result[j].접수;
                 }

               });
          console.log(contest);
          console.log(con_signup);
            for(i=0;i<contest.lengh;i++){
            cekResponse.setSimpleSpeechText(contest[i]+"의 접수일정은 "+con_signup[i]+"입니다.");
              }
            break;

            case 'contestCallIntent'://ㅇㅇㅇ대회일정 알려줘
               var value = this.request.intent.slots.contest_name.value
               con.query("SELECT 대회이름,대회 FROM 대회 where 대회이름 like '%"+value+"%'",function(err,result,fields){
                   if (err) throw err;

                      for(i=0;i<result.length;i++){
                       contest[i]=result[i].대회이름;
                     }
                      for(j=0;j<result.length;j++){
                       contest_date[j]=result[j].대회;
                     }

                   });
              console.log(contest);
              console.log(contest_date);
                cekResponse.setSimpleSpeechText(contest[0]+"의 대회일정은 "+contest_date[0]+"이고 "+contest[1]+"의 대회일정은 "+contest_date[1]+"입니다");

                break;

         case 'employConIntent'://채용공고알려줘(new)
          var value = this.request.intent.slots.company_name.value
          con.query("SELECT 공고 FROM 채용공고 where 회사이름 like '%"+value+"%'",function(err,result,fields){
             if (err) throw err;
               for(i=0;i<result.length;i++){
                 company[i]=result[i].공고;
               }
             });
             console.log(company);
            cekResponse.setSimpleSpeechText(value+"의 채용공고는 "+company+"이(가) 있습니다");
            break;


            case 'RequestCareerIntent'://채용공고에서 요구하는 경력알려줘
              var value = this.request.intent.slots.company_name.value
              con.query("SELECT 공고,경력 FROM 채용공고 where 회사이름 like '%"+value+"%'",function(err,result,fields){
                if (err) throw err;
                  for(i=0;i<result.length;i++){
                    company[i]=result[i].공고;
                  }
                  for(j=0;j<result.length;j++){
                   career[j]=result[j].경력;
                  }
                });
              console.log(company);
              console.log(career);
                cekResponse.setSimpleSpeechText(value+"의 요구 경력은 "+company[0]+"는 "+career[0]+"이고 "+company[1]+"는 "+career[1]+"이고 "  +company[2]+"는 "+career[2]+"입니다");
                break;

            case 'RequestCodingIntent'://채용공고에서 요구하는 코딩알려줘
              var value = this.request.intent.slots.company_name.value
                con.query("SELECT DISTINCT 공고,요구코딩 FROM 채용공고 where 회사이름 like '%"+value+"%'",function(err,result,fields){
                  if (err) throw err;
                    for(i=0;i<result.length;i++){
                        company[i]=result[i].공고;
                      }
                      for(j=0;j<result.length;j++){
                       coding[j]=result[j].요구코딩;
                      }
                    });
                  console.log(company);
                  console.log(coding);
                    cekResponse.setSimpleSpeechText(value+"에서 요구하는 코딩능력은 "+company[0]+"는 "+coding[0]+"이고 "+company[1]+"는 "+coding[1]+"이고 "  +company[2]+"는 "+coding[2]+"입니다");
                    break;



              case 'copAddIntent'://~~회사의 위치알려줘
                var value = this.request.intent.slots.company_name.value
                  con.query("SELECT DISTINCT 주소 FROM 채용공고 where 회사이름 like '%"+value+"%'",function(err,result,fields){
                    if (err) throw err;
                      for(i=0;i<result.length;i++){
                          comAdd[i]=result[i].주소;
                        }
                      });
                      cekResponse.setSimpleSpeechText(value+"의 주소는 "+comAdd[0]+"입니다.");
                    break;

              case 'copNeedIntent'://~~요구코딩을 원하는 회사 알려줘
                  var value = this.request.intent.slots.need.value
                    con.query("SELECT DISTINCT 회사이름,공고 FROM 채용공고 where 요구코딩 like '%"+value+"%'",function(err,result,fields){
                      if (err) throw err;
                        for(i=0;i<result.length;i++){
                            copName[i]=result[i].회사이름;
                          }
                        for(j=0;j<result.lengh;j++){
                            needPP[j]=result.공고;
                        }
                        });
                        cekResponse.setSimpleSpeechText(value+"를 요구하는 회사는"+copName+"이며, 공고내용은 "+needPP+"입니다");
                    break;

              case 'findCopIntent'://~~에 위치한 회사 알려줘
                var value = this.request.intent.slots.copaddr.value
                  con.query("SELECT DISTINCT 회사이름 FROM 채용공고 where 주소 like '%"+value+"%'",function(err,result,fields){
                    if (err) throw err;
                      for(i=0;i<result.length;i++){
                          copName[i]=result[i].회사이름;
                        }
                      });
                      cekResponse.setSimpleSpeechText(value+"에 위치한 회사는"+copName+"입니다");
                      break;

              case 'careerIntent'://경력(슬롯)을 요구하는 회사 알려줘
                var value = this.request.intent.slots.career.value
                  con.query("SELECT 회사이름,공고 FROM 채용공고 where 경력 like '%"+value+"%'",function(err,result,fields){
                    if (err) throw err;
                      for(i=0;i<result.length;i++){
                          copName[i]=result[i].회사이름;
                        }
                        for(j=0;j<result.lengh;j++){
                            needPP[j]=result[i].공고;
                        }
                      });
                      cekResponse.setSimpleSpeechText(value+"를 요구하는 회사는"+copName+"이며, 공고내용은 "+needPP+"입니다");
                      break;

              case 'findContestIntent'://~월(슬롯)에 접수하는 대회알려줘
                var value = this.request.intent.slots.month.value
                  con.query("SELECT 대회이름 FROM 대회 where 접수 like '%"+value+"%'",function(err,result,fields){
                    if (err) throw err;
                      for(i=0;i<result.length;i++){
                          contest[i]=result[i].대회이름;
                        }
                      });
                      cekResponse.setSimpleSpeechText(value+"에 접수중인 대회는"+contest+"입니다");
                      break;

                      case 'companyA'://발화문: 서울에 위치하고 신입을 뽑는 회사 알려줘
                      var valueA = this.request.intent.slots.copaddr.value
                      var valueB = this.request.intent.slots.career.value
                      console.log(valueA);
                      console.log(valueB);
                      con.query("select 회사이름 from 채용공고 where 주소  like '%"+valueA+"%' and 경력  like  '%"+valueB+"%'",function(err,result,fields){
                        if(err) throw err;
                        console.log(result.length);
                          for(i=0;i<result.length;i++){
                            signup[i]=result.회사이름[i];
                          }
                        });
                      console.log(signup);
                      cekResponse.setSimpleSpeechText(valueA+"에 위치하고 "+valueB+"을 뽑는 회사는 "+signup+"가 있습니다.");
                        break;


                      case 'companyB'://발화문: 서버쪽을 개발하고 경력이 무관한 회사에 이름 알려줘
                      var valueA = this.request.intent.slots.need.value
                      var valueB = this.request.intent.slots.plut.value
                      var valueC = this.request.intent.slots.career.value
                      console.log(valueA);
                      console.log(valueB);
                      con.query("select 회사이름 from 채용공고 where 요구코딩  like '%"+valueA+"%' and 공고  like  '%"+valueB+"%' 경력 like '%"+valueC+"%'",function(err,result,fields){
                        if(err) throw err;
                        console.log(result.length);
                          for(i=0;i<result.length;i++){
                            signup[i]=result.회사이름[i];
                          }
                        });
                      console.log(signup);
                      cekResponse.setSimpleSpeechText(valueA+"을 "+valueB+"하고 "+valueC+"이 무관한 회사에 이름은 "+signup+"입니다.");
                        break;

                      case 'employerA'://발화문: 컴퓨터활용능력 실기 시험일자 알려줘
                      var valueA = this.request.intent.slots.licname.value
                    	var valueB = this.request.intent.slots.division.value
                    	console.log(valueA);
                    	console.log(valueB);
                    	con.query("select 시험일자 from 자격증  where 이름  like '%"+valueA+"%' and 구분  like  '%"+valueB+"%'",function(err,result,fields){
                    		if(err) throw err;
                        console.log(result.length);
                    			for(i=0;i<result.length;i++){
                    				signup[i]=result.시험일자[i];
                    			}
                        });
                    	console.log(signup);
                    	cekResponse.setSimpleSpeechText(valueA+" "+valueB+" 시험일자는 "+signup+"입니다.");
                        break;

                      case 'employerB'://발화문: 워드프로세서 필기 합격점수 알려줘
                      var valueA = this.request.intent.slots.licname.value
                    	var valueB = this.request.intent.slots.division.value
                    	console.log(valueA);
                    	console.log(valueB);
                    	con.query("select 합격점수 from 자격증  where 이름  like '%"+valueA+"%' and 구분  like  '%"+valueB+"%'",function(err,result,fields){
                    		if(err) throw err;
                        console.log(result.length);
                    			for(i=0;i<result.length;i++){
                    				signup[i]=result.합격점수[i];
                    			}
                        });
                    	console.log(signup);
                          cekResponse.setSimpleSpeechText(valueA+" "+valueB+" 합격점수는 "+signup+" 입니다")
                        break;






    case 'Clova.GuideIntent':
      cekResponse.setSimpleSpeechText("잘 이해하지 못했어요 다시한번 말씀해 주세요")
    default:
    cekResponse.setSimpleSpeechText("또 무엇을 도와드릴까요")
    }

    if (this.session.new == false) {
      cekResponse.setMultiturn()
    }
  }

  sessionEndedRequest(cekResponse) {
    console.log('sessionEndedRequest')
    cekResponse.setSimpleSpeechText('취업서비스를 종료합니다.')
    cekResponse.clearMultiturn()
  }
}

class CEKResponse {
  constructor () {
    console.log('CEKResponse constructor')
    this.response = {
      directives: [],
      shouldEndSession: true,
      outputSpeech: {},
      card: {},
    }
    this.version = '0.1.0'
    this.sessionAttributes = {}
  }

  setMultiturn(sessionAttributes) {
    this.response.shouldEndSession = false
    this.sessionAttributes = _.assign(this.sessionAttributes, sessionAttributes)
  }

  clearMultiturn() {
    this.response.shouldEndSession = true
    this.sessionAttributes = {}
  }

  setSimpleSpeechText(outputText) {
    this.response.outputSpeech = {
      type: 'SimpleSpeech',
      values: {
          type: 'PlainText',
          lang: 'ko',
          value: outputText,
      },
    }
  }

  appendSpeechText(outputText) {
    const outputSpeech = this.response.outputSpeech
    if (outputSpeech.type != 'SpeechList') {
      outputSpeech.type = 'SpeechList'
      outputSpeech.values = []
    }
    if (typeof(outputText) == 'string') {
      outputSpeech.values.push({
        type: 'PlainText',
        lang: 'ko',
        value: outputText,
      })
    } else {
      outputSpeech.values.push(outputText)
    }
  }
}

const clovaReq = function (httpReq, httpRes, next) {
  cekResponse = new CEKResponse()
  cekRequest = new CEKRequest(httpReq)
  cekRequest.do(cekResponse)
  console.log(`CEKResponse: ${JSON.stringify(cekResponse)}`)
  return httpRes.send(cekResponse)
};

module.exports = clovaReq;
