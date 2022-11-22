let watermark = {}

let setWatermark = (text, sourceBody) => {
  let id = Math.random() * 10000 + '-' + Math.random() * 10000 + '/' + Math.random() * 10000

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }

  let can = document.createElement('canvas')
  can.width = 250
  can.height = 300

  let cans = can.getContext('2d')
  cans.rotate((-20 * Math.PI) / 180)
  cans.font = '15px Vedana'
  cans.fillStyle = 'rgba(200, 200, 200, .4)'
  cans.textAlign = 'center'
  cans.textBaseline = 'Middle'
  cans.fillText('西京云检测', can.width / 2, can.height / 2, 220)
  cans.fillText(text, can.width / 2, can.height / 2 + 20, 220)
  cans.fillText(currentdatestr(), can.width / 2, can.height / 2 + 40, 220)
  // drawText(cans, text, 45, 150, 230, 450)

  let water_div = document.createElement('div')
  water_div.id = id
  water_div.style.pointerEvents = 'none'
  water_div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
  if (sourceBody) {
    water_div.style.width = '100%'
    water_div.style.height = '100%'
    sourceBody.appendChild(water_div)
  } else {
    water_div.style.top = '3px'
    water_div.style.left = '0px'
    water_div.style.position = 'fixed'
    water_div.style.zIndex = '100000'
    water_div.style.width = document.documentElement.clientWidth + 'px'
    water_div.style.height = document.documentElement.clientHeight + 'px'
    document.body.appendChild(water_div)
  }

  return id
}

function currentdatestr() {
  var current_datetime = new Date()
  let formatted_date =
    current_datetime.getFullYear() +
    '/' +
    (current_datetime.getMonth() + 1) +
    '/' +
    current_datetime.getDate() +
    ' ' +
    current_datetime.getHours() +
    ':' +
    current_datetime.getMinutes() +
    ':' +
    current_datetime.getSeconds()
  return formatted_date
}

/**
 *  该方法只允许调用一次
 *  @param:
 *  @text == 水印内容
 *  @sourceBody == 水印添加在哪里，不传就是body
 * */
watermark.set = (text, sourceBody) => {
  let id = setWatermark(text, sourceBody)
  setInterval(() => {
    if (document.getElementById(id) === null) {
      id = setWatermark(text, sourceBody)
    }
  }, 2000)
  window.onresize = () => {
    setWatermark(text, sourceBody)
  }
}

export default watermark
