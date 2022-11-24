const uuid = require('uuid').v4
const _ = require('lodash')
const { DOMAIN } = require('./config')
const license=["컴퓨터","워드","엑셀"]
const licCop=["대한상공회의소",'한국방송통신전파진흥원','Q-net','한국콘텐츠 진흥원']
const documents=['졸업증명서','성적증명서','경력증명서','자격증 확인서']
// const lic=['1급', '엑셀']

var mysql = require('mysql');

var connecion = mysql.createConnecion({
  user : 'anetfotoa',
  password : 'a4415588',
  database : 'clova'
});

connection.connect();


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

function resultText({midText, sum, diceCount}) {
  if (diceCount == 1) {
    return `결과는 ${sum}입니다.`
  } else if (diceCount < 4) {
    return `결과는 ${midText} 이며 합은 ${sum} 입니다.`
  } else {
    return `주사위 ${diceCount}개의 합은 ${sum} 입니다.`
  }
}

function throwDice(diceCount) {
  const results = []
  let midText = ''
  let resultText = ''
  let sum = 0
  console.log(`throw ${diceCount} times`)
  for (let i = 0; i < diceCount; i++) {
    const rand = Math.floor(Math.random() * 6) + 1
    console.log(`${i + 1} time: ${rand}`)
    results.push(rand)
    sum += rand
    midText += `${rand}, `
  }

  midText = midText.replace(/, $/, '')
  return {midText, sum, diceCount}
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
    cekResponse.setSimpleSpeechText('시행처의 이름을 알려주세요.')
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
    case 'licenseCallIntent'://발화문:자격증 조회해줘
      cekResponse.setSimpleSpeechText("자격증 조회는 시행처별 조회, 전체 자격증 조회가 있습니다.")
      break;
    case 'licenseIntent'://발화문 : 전체 자격증 알려줘
      cekResponse.setSimpleSpeechText("자격증은 "+license+"등 여러가지가 있습니다.")
      break;
    case 'licenseCOPIntent'://발화문 : 자격증을 취득할 수 있는 시행처 알려줘
      cekResponse.setSimpleSpeechText("자격증을 취득할 수 있는 대표적인 시행처로는 "+licCop+"이 있습니다.")
      break;
    case 'corporationIntent'://발화문 : ~~시행처에 대한 정보 알려줘
      cekResponse.setSimpleSpeechText("대한상공회의소는 컴퓨터활용능력, 워드프로세서, 전산회계운용사 등의 자격증 시험을 제공하고 있습니다.")
      break;
    case 'copLinkIntent'://발화문 : ~~시행처의 사이트 링크 알려줘
      cekResponse.setSimpleSpeechText("대한상공회의소의 사이트 링크는 http://license.korcham.net/ 입니다.")
      break;
    case 'copTelIntent'://발화문 : ~~시행처의 고객센터 전화번호 알려줘
      cekResponse.setSimpleSpeechText("대한상공회의소의 고객센터 전화번호는 02-2102-3600입니다")
      break;
    case 'copTelLinkIntent'://발화문 : 대한상공회의소 고객센터로 전화연결해줘
      cekResponse.setSimpleSpeechText("대한상공회의소 고객센터로 연결해드릴게요")
      break;
    case 'licenseInfIntent'://~~ 자격증에 대한 정보 알려줘
      cekResponse.setSimpleSpeechText("정보처리기사 자격증은 기업체 전산실, 소프트웨어 개발 업체 등 시스템 개발 및 운용을 하거나 정보처리를 시행할 수 있는 자격증입니다. 정보처리기사 자격증은 4년제 학위 또는 실무경력 4년, 학점은행제 106학점 이수를 해야지만 응시자격이 주어집니다.")
      break;
  case 'licTestIntent'://~~자격증의 시험일정 알려줘
      cekResponse.setSimpleSpeechText("정보처리기사 자격증의 2019년도 시험일정은 ~~이 있습니다.")
      break;
    case 'licMoneyIntent'://~~자격증의 응시료 알려줘
      cekResponse.setSimpleSpeechText("정보처리기사 자격증의 필기 응시료는 ~~원이고 실기 응시료는 ~~원입니다")
      break;
    case 'licDayIntent'://~~자격증의 합격 발표일 알려줘
      cekRequest.setSimpleSpeechText("정보처리기사 자격증의 합격예정자, 최종합격자 발표는 --일 오전 --시 입니다.")
      break;
    case 'licSiteIntent'://~~자격증의 사이트 연결해줘
      cekResponse.setSimpleSpeechText("컴퓨터활용능력 자격증의 사이트 링크는 http://license.korcham.net/ 입니다.")
      break;
    case 'contestCallIntent'://프로그래밍이나 코딩 대회에 대한 일정 알려줘
      cekResponse.setSimpleSpeechText("대회에 대한 정보로는 한국대학생프로그래밍 경진대회, 국제해킹방어대회, 코드게이트, 글로벌 SW 공모대전, 임베디드 소프트웨어 경진대회 등이 있습니다.")
      break;
    case 'contestDayIntent'://~~대회의 대회 접수일정 알려줘
      cekResponse.setSimpleSpeechText("국제해킹방어대회 접수 일정은 ~월 ~일 부터 ~월 ~일 까지 입니다.")
      break;
    case 'contestInfIntent'://~~대회에 대한 정보 알려줘
      cekResponse.setSimpleSpeechText("글로벌 SW 공모대전의 공모 대상은 상요화된 제품을 제외한 모든 소프트웨어가 가능하며, 공모분야는 응용 software, 모바일 앱, 게임 software, 임베디드 software, 보안 software등이 있습니다. 참가자격은 제한이 없습니다.")
      break;
    case 'employIntent'://채용정보 알려줘
      cekResponse.setSimpleSpeechText("2019년 상반기 채용은 삼성전자, 삼성SDS, 삼성SDI, 삼성화재 등이 있습니다 더 자세한 정보는 채용정보 홈페이지를 통해 알 수 있습니다.")
      break;
    case 'employInfIntent' : //~~회사에 대한 채용정보 알려줘
      cekResponse.setSimpleSpeechText("2019년 상반기 삼성전자의 모집분야는 네트워크 사업부 FPGA, SW분야에 대해 채용모집이 이루어지고 있습니다.")
      break;
    case 'employEntIntent'://~~회사의 지원자격에 대해 알려줘
      cekResponse.setSimpleSpeechText("삼성전자의 지원자격은 병역필 또는 면제자, 박사학위 소지자, 석사학위 소지자, 학사학위 소지자 입니다.")
      break;
    case 'employStepIntent'://~~회사의 전형 절차에 대해 알려줘
      cekResponse.setSimpleSpeechText("19년 ~월~일 17시 까지 지원서 접수 후 서류 전형, 면접전형, 채용건강검진 후 6월 중순에 최종발표를 거치게 됩니다.")
      break;
    case 'employDocIntent'://~~회사의 필요한 제출서류에 대해 알려줘
      cekResponse.setSimpleSpeechText("삼성전자에 필요한 제출 서류는 "+documents+"등 입니다")
      break;
      // case 'CrawlingIntent'://크롤링한거 보여주삼
      //   cekResponse.setSimpleSpeechText("크롤링한 내용은 "+lic+"등 입니다")
      //   break;








    case 'Clova.GuideIntent':
      //cekResponse.setSimpleSpeechText("잘 이해하지 못했어요 다시한번 말씀해 주세요")
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
