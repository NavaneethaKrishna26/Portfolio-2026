import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SkillDemo = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNum = (num) => {
    if (display === '0') setDisplay(num);
    else setDisplay(display + num);
  };

  const handleOp = (op) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    if (!equation) return;
    try {
      // Basic evaluator for demo purposes
      const fullEq = equation + display;
      // eslint-disable-next-line no-new-func
      const result = new Function('return ' + fullEq.replace('x', '*'))(); 
      setDisplay(String(result));
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <section className="section bg-secondary" id="demo">
      <div className="container">
        <h2 className="section-title">Interactive Demo</h2>
        <motion.div 
          className="demo-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="calc-display">
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', position: 'absolute', transform: 'translateY(-25px)' }}>
              {equation}
            </div>
            {display}
          </div>
          <div className="calc-grid">
            <button className="calc-btn op" onClick={clear} style={{ gridColumn: 'span 2' }}>AC</button>
            <button className="calc-btn op" onClick={() => handleOp('x')}>×</button>
            <button className="calc-btn op" onClick={() => handleOp('/')}>÷</button>
            
            <button className="calc-btn" onClick={() => handleNum('7')}>7</button>
            <button className="calc-btn" onClick={() => handleNum('8')}>8</button>
            <button className="calc-btn" onClick={() => handleNum('9')}>9</button>
            <button className="calc-btn op" onClick={() => handleOp('-')}>-</button>
            
            <button className="calc-btn" onClick={() => handleNum('4')}>4</button>
            <button className="calc-btn" onClick={() => handleNum('5')}>5</button>
            <button className="calc-btn" onClick={() => handleNum('6')}>6</button>
            <button className="calc-btn op" onClick={() => handleOp('+')}>+</button>
            
            <button className="calc-btn" onClick={() => handleNum('1')}>1</button>
            <button className="calc-btn" onClick={() => handleNum('2')}>2</button>
            <button className="calc-btn" onClick={() => handleNum('3')}>3</button>
            <button className="calc-btn eq" onClick={calculate}>=</button>
            
            <button className="calc-btn" onClick={() => handleNum('0')} style={{ gridColumn: 'span 2' }}>0</button>
            <button className="calc-btn" onClick={() => handleNum('.')}>.</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillDemo;
