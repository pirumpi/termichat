require('@babel/register')({
  presets: [['@babel/preset-env'], ['@babel/preset-react']],
});
require('./lib/ui');
// var blessed = require('blessed')
//   , contrib = require('blessed-contrib')
//   , screen = blessed.screen({smartCSR: true})

//   //grid.set(row, col, rowSpan, colSpan, obj, opts)
//   , grid = new contrib.grid({rows: 2, cols: 2, screen: screen})
//   , map = grid.set(0, 1, 2, 1, blessed.box, {label: 'World Map', content: 'My content', scrollable: true})
//   //, box = grid.set(0, 0, 2, 1, blessed.box, {content: 'My Box'})
//   , box = grid.set(0, 0, 2, 1, blessed.box, {content: 'Button'})

//   var btn = blessed.button({content: 'click', height: 3, width: 8, border:{type: 'line'}, keys: true})
//   btn.on('press', () => {
//     map.content = 'Popo';
//     screen.render()
//   })


//   var tb = blessed.listbar()
//   tb.setItems({
//       'pluggin': {
//           keys: ['C-p'],
//           callback: () => {
//               process.exit(0)
//           }
//       },
//       'emojies': {
//         keys: ['C-e'],
//         callback: () => {
//             process.exit(0)
//         }
//     }
//   });
//   map.append(tb)
//   box.append(btn)
// setInterval(() => {
//     screen.remove(grid)
//     screen.render()
// }, 1000);
//   screen.key(['escape', 'q'], () => process.exit(0));
// screen.render()
