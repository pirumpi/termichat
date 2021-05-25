import React, { useRef, useState, useEffect } from 'react';
import blessed, { box } from 'blessed';
import { render } from 'react-blessed';

const App = () => {
    const texArea = useRef(null);
    const boxy = useRef(null)
    useEffect(() => {
        texArea.current.focus()
  
    }, [])

    const submit = (data) => {
        console.log('Yes dale')
        boxy.current.setLabel('Colo')
    }
    const handler = (ch, key) => {
        console.log(key)
        boxy.current.focus()
    }

    return (
        <box
        label="Termichat"
        ref={boxy}
        left="0"
        mouse
        inputOnFocus
        top="0"
        width="100%"
        height="100%"
        border={{type: 'line'}}
        >
        <form
            onSubmit={submit}
            onKeyPress={(ch, key) => {
                if (key.name == 'enter'){
                    process.exit(0)
                }
            }}
        >

        <textarea
            ref={texArea}
            height={5}
            bottom={0}
            width='99%'
            keys
            mouse
            inputOnFocus
            scrollable={true}
            onFocus={() => {
                texArea.current.setContent('Carlos is cool')
            }}
            onKeyPress={(ch, key) => {
                if (key.name == 'enter'){
                    process.exit(0)
                }
            }}
            style={{fg: '#787878', bg: '#454545', focus: { fg: '#f6f6f6', bg: '#99ccff'}}}
          />
        </form>
     </box>
    
    );
  };

const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'Termichat'
});

screen.key(['escape', 'q', 'C-c', 'C-e', 'enter', 'C-enter'], (ch, key) => {
    console.log(key, ch)
    if (key.sequence === '\x1B') {
        process.exit(0)
    }
});

const component = render(<App />, screen);