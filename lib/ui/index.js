import React, { useRef, useState, useEffect } from 'react';
import blessed, { box } from 'blessed';
import { render } from 'react-blessed';

const App = () => {
    const [cola, setCola] = useState(1)
    const texArea = useRef(null);
    const cancel = () => console.log('Cancel')
    const setCo  = () => console.log('Seco')
    useEffect(() => {
        //texArea.current.focus()
        setTimeout(() => setCola(0), 1000)
        setTimeout(() => {
            setCola(1)
            texArea.current.setContent('caro')
        }, 3000)
    }, [])
    return (
        <box
        label="Termichat"
        left="0"
        top="0"
        width="100%"
        height="100%"
        border={{type: 'line'}}
        >
        {cola ? (
            <textarea
            ref={texArea}
            left={6}
            height={5}
            bottom={0}
            width='70%'
            keys
            inputOnFocus
            style={{fg: '#787878', bg: '#454545', focus: { fg: '#f6f6f6', bg: '#353535'}}}
          border= {{type: 'line' }}
          />
        ): ( <></> )}
      
     </box>
    
    );
  };

const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'Termichat'
});

screen.key(['escape', 'q'], () => process.exit(0));

const component = render(<App />, screen);