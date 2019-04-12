

module.exports = (icon, name, msg, by, color = []) => {
  let c1 = parseInt(Math.random() * color.length)
  let c2 = parseInt(Math.random() * color.length)
  let c3 = parseInt(Math.random() * color.length)
  let flexMessage = {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              margin: 'md',
              text: `Happy${icon}Birthday`,
              weight: 'bold',
              align: 'center',
              color: color[c1],
              size: 'xxl'
            },
            {
              type: 'text',
              text: `✨ ${name} ✨`,
              align: 'center',
              color: color[c2],
              weight: 'bold',
              size: 'sm'
            }
          ]
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'xl',
          contents: [
            {
              type: 'text',
              text: `“ ${msg}. ”`,
              wrap: true,
              color: color[c3],
              weight: 'bold',
              size: 'sm',
              align: 'center',
              flex: 12
            }
          ]
        },
        {
          type: 'separator',
          margin: 'md'
        },
        {
          type: 'text',
          margin: 'sm',
          align: 'end',
          text: `― ${by}`,
          color: '#cccccc',
          size: 'xxs'
        }
      ]
    }
  }
  return {
    type: 'flex',
    altText: `HAPPY BIRTHDAY!! ${name}~`,
    contents: flexMessage
  }
}