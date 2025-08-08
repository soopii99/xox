@@ .. @@
   const handlePlayAgain = useCallback(() => {
     setBoard(Array(9).fill(null));
-    setXIsNext(true
+    setXIsNext(true);
+    setWinnerInfo(null);
+    setIsDraw(false);
+  }, []);
+
+  const currentPlayer = xIsNext ? playerNames.playerX : playerNames.playerO;
+  const currentSymbol = xIsNext ? 'X' : 'O';
+
+  return (
+    <div className="animate-fade-in">
+      {!winnerInfo && !isDraw && (
+        <div className="mb-6 text-center">
+          <p className="text-lg text-gray-300">
+            {isAiThinking ? (
+              <span className="flex items-center justify-center">
+                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-teal-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
+                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
+                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
+                </svg>
+                Gemini AI is thinking...
+              </span>
+            ) : (
+              <>
+                <span className={`font-semibold ${currentSymbol === 'X' ? 'text-blue-400' : 'text-teal-300'}`}>
+                  {currentPlayer}
+                </span>
+                's turn ({currentSymbol})
+              </>
+            )}
+          </p>
+        </div>
+      )}
+
+      <div className="grid grid-cols-3 gap-3 mb-6 justify-center">
+        {board.map((square, i) => (
+          <Square
+            key={i}
+            value={square}
+            onClick={() => handleClick(i)}
+            isWinner={winnerInfo ? winnerInfo.line.includes(i) : false}
+          />
+        ))}
+      </div>
+
+      <Modal isOpen={winnerInfo !== null || isDraw} onClose={() => {}}>
+        <div className="text-center">
+          {winnerInfo ? (
+            <>
+              <div className="text-6xl mb-4">🎉</div>
+              <h3 className="text-2xl font-bold mb-2 text-white">
+                {winnerInfo.winner === 'X' ? playerNames.playerX : playerNames.playerO} Wins!
+              </h3>
+              <p className="text-gray-400 mb-6">
+                Congratulations on your victory!
+              </p>
+            </>
+          ) : (
+            <>
+              <div className="text-6xl mb-4">🤝</div>
+              <h3 className="text-2xl font-bold mb-2 text-white">It's a Draw!</h3>
+              <p className="text-gray-400 mb-6">
+                Great game! You're both excellent players.
+              </p>
+            </>
+          )}
+          <button
+            onClick={handlePlayAgain}
+            className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
+          >
+            Play Again
+          </button>
+        </div>
+      </Modal>
+    </div>
+  );
+};
+
+export default GameBoard;