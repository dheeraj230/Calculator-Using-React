import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

function App() {
    const [result, setResult] = useState("");
    const [brightMode, setBrightMode] = useState(false); // Brightness Toggle State

    // Handle button click
    const handleClick = (e) => {
        setResult((prev) => prev + e.target.name);
    };

    // Handle clear input
    const clear = () => {
        setResult("");
    };

    // Handle backspace
    const backspace = () => {
        setResult((prev) => prev.slice(0, -1));
    };

    // Safe evaluation function
    const safeEvaluate = (expression) => {
        try {
            if (!expression.trim()) return "";
            const result = new Function(`return ${expression}`)();
            return result !== undefined ? result : "Error";
        } catch {
            return "Error";
        }
    };

    // Handle calculation
    const calculate = () => {
        const evaluatedResult = safeEvaluate(result);
        setResult(String(evaluatedResult));
    };

    // Keyboard Handler
    const handleKeyDown = useCallback((event) => {
        const key = event.key;

        if (/[\d+\-*/().]/.test(key)) {
            setResult((prev) => prev + key);
        } else if (key === "Enter") {
            event.preventDefault();
            calculate();
        } else if (key === "Backspace") {
            backspace();
        } else if (key === "Escape") {
            clear();
        }
    }, [calculate, backspace, clear]);

    // Attach keyboard event listeners
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    // Toggle Brightness Mode
    const toggleBrightness = () => {
        setBrightMode((prev) => !prev);
    };

    return (
        <>
            <div className={`container ${brightMode ? "bright-mode" : ""}`}>
                <form>
                    <input type="text" value={result} readOnly />
                </form>

                <div className="keypad">
                    <button className="light-btn" onClick={clear} id="clear">Clear</button>
                    <button className="light-btn" onClick={backspace} id="backspace">C</button>
                    <button className="highlight" name="/" onClick={handleClick}>/</button>
                    <button className="highlight" name="*" onClick={handleClick}>*</button>

                    <button name="7" onClick={handleClick}>7</button>
                    <button name="8" onClick={handleClick}>8</button>
                    <button name="9" onClick={handleClick}>9</button>
                    <button className="highlight" name="-" onClick={handleClick}>-</button>

                    <button name="4" onClick={handleClick}>4</button>
                    <button name="5" onClick={handleClick}>5</button>
                    <button name="6" onClick={handleClick}>6</button>
                    <button className="highlight" name="+" onClick={handleClick}>+</button>

                    <button name="1" onClick={handleClick}>1</button>
                    <button name="2" onClick={handleClick}>2</button>
                    <button name="3" onClick={handleClick}>3</button>
                    <button name="(" onClick={handleClick}>(</button>

                    <button name="0" onClick={handleClick}>0</button>
                    <button name="." onClick={handleClick}>.</button>
                    <button name=")" onClick={handleClick}>)</button>
                    <button name="√" onClick={() => setResult(Math.sqrt(parseFloat(result)) || "Error")}>√</button>

                    {/* Equals and Brightness Toggle together */}
                    <button className="highlight big-btn" onClick={calculate} id="result">=</button>
                    <button className="toggle-brightness big-btn" onClick={toggleBrightness}>
                        {brightMode ? "🌙 Dim" : "🔆 Bright"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default App;
