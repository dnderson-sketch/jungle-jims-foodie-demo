import React, { useEffect, useRef, useState } from 'react';

// Jungle Jim's official logo
const LOGO = 'https://www.junglejims.com/wp-content/uploads/2023/07/Jungle-Jims-Logo.png';

// Family-friendly Jungle Jim's photos (from official sources & Wikimedia)
const IMAGES = [
  'https://www.junglejims.com/wp-content/uploads/2023/07/Jungle-Jims-Logo.png',
  'https://upload.wikimedia.org/wikipedia/commons/3/32/Angle%28361666316%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/1/1a/Big_Cheese_silo_at_Jungle_Jim%27s.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/4/4d/JungleJim%27s_interior.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/6/68/Jungle_Jim%27s_hot_sauce.jpg'
];

const RECIPES = [
  {
    name: 'Thai Jungle Curry',
    time: '30 min',
    difficulty: 'Medium',
    img: IMAGES[2],
    ingredients: [
      { name: 'Mae Ploy Red Curry Paste', clue: 'Fly to the Asian rainforest where red paste hides in tiny tubs!', hint: 'Mae Ploy — red tub, gold lid' },
      { name: 'Coconut Milk', clue: 'Climb the tropical tree for creamy white nectar in cans!', hint: 'Chaokoh or Aroy-D' },
      { name: 'Thai Eggplant', clue: 'Hunt the purple orbs in the exotic produce jungle!', hint: 'Small, round, green stripes' }
    ]
  },
  {
    name: 'Italian Jungle Lasagna',
    time: '75 min',
    difficulty: 'Medium',
    img: IMAGES[3],
    ingredients: [
      { name: 'Barilla Lasagna Noodles', clue: 'Sail to Italy for flat pasta sheets in blue boxes!', hint: 'No-boil preferred' },
      { name: 'Rao\'s Marinara', clue: 'Find the premium red sauce in glass jars — worth the gold!', hint: 'Rao\'s — tastes homemade' },
      { name: 'Ricotta Cheese', clue: 'Visit the Italian dairy valley for creamy white tubs!', hint: 'Galbani or store brand' }
    ]
  },
  {
    name: 'Mexican Street Corn (Elote)',
    time: '20 min',
    difficulty: 'Easy',
    img: IMAGES[4],
    ingredients: [
      { name: 'Cotija Cheese', clue: 'Search the Hispanic cheese case for crumbly white gold!', hint: 'In wax paper' },
      { name: 'Mexican Crema', clue: 'Find the sour cream\'s richer cousin in squeeze bottles!', hint: 'Cacique brand' },
      { name: 'Tajín Seasoning', clue: 'Grab the red bottle with the lime-chili punch!', hint: 'Tajín Clásico' }
    ]
  }
];

export default function ChefQuestAdventure() {
  const heroRef = useRef();
  const [running, setRunning] = useState(false);
  const [recipeIndex, setRecipeIndex] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showCooking, setShowCooking] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  function pickRecipe(i) {
    setRecipeIndex(i ?? Math.floor(Math.random() * RECIPES.length));
  }

  function startDemo() {
    if (recipeIndex === null) pickRecipe();
    setRunning(true);
    setCurrentStep(0);
    setShowCheckout(false);
    setShowCooking(false);
  }

  function nextClue() {
    if (currentStep + 1 < RECIPES[recipeIndex].ingredients.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowCheckout(true);
    }
  }

  function unlockCooking() {
    setShowCheckout(false);
    setShowCooking(true);
  }

  function resetDemo() {
    setRunning(false);
    setRecipeIndex(null);
    setCurrentStep(0);
    setShowCheckout(false);
    setShowCooking(false);
  }

  const currentRecipe = recipeIndex !== null ? RECIPES[recipeIndex] : null;
  const currentIngredient = currentRecipe ? currentRecipe.ingredients[currentStep] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-yellow-300 to-orange-600 p-4 md:p-6">
      <div className="max-w-5xl mx-auto bg-white/95 rounded-3xl shadow-2xl overflow-hidden">

        {/* Hero Section */}
        <header className="relative h-72 md:h-96 flex items-center overflow-hidden">
          <div
            ref={heroRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${IMAGES[1]})`,
              filter: 'brightness(0.7) saturate(1.2)'
            }}
          />
          <div className="relative z-10 w-full px-6 md:px-12 flex items-center">
            <div className="flex-1">
              <img src={LOGO} alt="Jungle Jim's" className="h-20 md:h-32 drop-shadow-lg mb-2" />
              <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
                Chef Quest
              </h1>
              <p className="mt-2 md:mt-3 text-base md:text-xl text-white/95 max-w-md">
                Explore Jungle Jim's — find wild ingredients, complete treasure hunts, cook up the adventure!
              </p>
              <button
                onClick={startDemo}
                className="mt-5 px-6 md:px-8 py-3 md:py-4 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base md:text-lg shadow-lg transition-all hover:scale-105"
              >
                Start the Quest →
              </button>
            </div>
            {recipeIndex !== null && !running && (
              <div className="hidden lg:block w-64 ml-8 rounded-2xl overflow-hidden shadow-2xl">
                <img src={currentRecipe.img} alt="Recipe" className="w-full h-64 object-cover" />
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 md:p-12">

          {/* Recipe Selection Screen */}
          {!running && (
            <div className="text-center space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Pick Your Recipe</h2>
                <p className="text-gray-600 mt-2">Choose a dish to hunt for ingredients across Jungle Jim's aisles</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {RECIPES.map((r, i) => (
                  <button
                    key={r.name}
                    onClick={() => pickRecipe(i)}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      recipeIndex === i 
                        ? 'border-yellow-500 bg-yellow-50 shadow-lg scale-105' 
                        : 'border-gray-200 bg-white hover:border-yellow-300'
                    }`}
                  >
                    <img src={r.img} alt={r.name} className="w-full h-40 object-cover rounded-lg mb-3" />
                    <h3 className="font-bold text-lg text-gray-800">{r.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">⏱️ {r.time} • 📊 {r.difficulty}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quest Flow */}
          {running && !showCheckout && !showCooking && currentRecipe && (
            <div className="text-center space-y-8">
              <div className="bg-gradient-to-r from-emerald-50 to-yellow-50 p-8 rounded-2xl border-2 border-emerald-200">
                <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-4">
                  🎯 Clue #{currentStep + 1}
                </h2>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  {currentIngredient?.clue}
                </p>
                <p className="text-base text-amber-800 font-semibold italic">
                  💡 Hint: {currentIngredient?.hint}
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-gray-700 mb-4">Ingredients Collected:</h3>
                <div className="space-y-2">
                  {currentRecipe.ingredients.map((ing, idx) => (
                    <div key={idx} className={`p-3 rounded-lg ${idx <= currentStep ? 'bg-emerald-100 text-emerald-900' : 'bg-gray-200 text-gray-600'}`}>
                      {idx <= currentStep ? '✅' : '⬜'} {ing.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button
                  onClick={nextClue}
                  className="px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-lg transition-all hover:scale-105"
                >
                  {currentStep + 1 === currentRecipe.ingredients.length ? '🎉 Found Everything!' : '✓ Found It!'}
                </button>
                <button
                  onClick={resetDemo}
                  className="px-8 py-4 rounded-full border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-100 transition-all"
                >
                  Restart
                </button>
              </div>
            </div>
          )}

          {/* Checkout Screen */}
          {showCheckout && currentRecipe && (
            <div className="text-center space-y-8">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-700">Quest Complete!</h2>
              <p className="text-xl text-gray-700">You've collected all ingredients for <strong>{currentRecipe.name}</strong></p>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl border-2 border-yellow-300">
                <p className="text-gray-700 mb-4">Head to checkout and scan this QR code for your recipe:</p>
                <div className="w-40 h-40 bg-white mx-auto rounded-lg p-2 border-2 border-yellow-400 flex items-center justify-center">
                  <div className="text-center text-sm text-gray-600">
                    🔲 QR CODE<br/>Scan for<br/>Recipe
                  </div>
                </div>
              </div>

              <button
                onClick={unlockCooking}
                className="px-8 py-4 rounded-full bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold text-lg shadow-lg transition-all hover:scale-105"
              >
                QR Scanned! → Cook It Up 🍗
              </button>
            </div>
          )}

          {/* Cooking Screen */}
          {showCooking && currentRecipe && (
            <div className="text-center space-y-8">
              <h2 className="text-4xl font-bold text-orange-700">🍳 Time to Cook!</h2>
              <p className="text-xl text-gray-700">Get ready to make <strong>{currentRecipe.name}</strong></p>
              
              <div className="bg-gray-50 p-8 rounded-2xl text-left max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Cooking Instructions:</h3>
                <ol className="space-y-3">
                  <li className="flex gap-4">
                    <span className="text-emerald-700 font-bold">1.</span>
                    <span>Prep all ingredients you collected from Jungle Jim's</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-emerald-700 font-bold">2.</span>
                    <span>Follow the recipe carefully, tasting as you go</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-emerald-700 font-bold">3.</span>
                    <span>Share your creation on social media with #ChefQuestJungleJims</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-emerald-700 font-bold">4.</span>
                    <span>Come back for another adventure!</span>
                  </li>
                </ol>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button
                  onClick={resetDemo}
                  className="px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-lg transition-all"
                >
                  Start New Quest
                </button>
                <button
                  onClick={() => window.open('mailto:sales@junglejims.com?subject=Chef%20Quest%20Demo%20Interest')}
                  className="px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-600 text-amber-900 font-bold text-lg shadow-lg transition-all"
                >
                  Talk to Sales
                </button>
              </div>
            </div>
          )}

          {/* Gallery */}
          <section className="mt-16 pt-12 border-t-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Gallery from Jungle Jim's</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {IMAGES.map((src, i) => (
                <div key={i} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all">
                  <img
                    src={src}
                    alt={`jungle-${i}`}
                    className="w-full h-32 object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 md:p-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 border-t-2 border-gray-200">
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg text-gray-800">Bring This Adventure to Your Store</h4>
            <p className="text-sm text-gray-600 mt-1">POS integration • QR checkout • Gamified shopping experience</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => window.open('mailto:sales@junglejims.com?subject=Chef%20Quest%20Demo')}
              className="px-6 py-3 rounded-full bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold shadow-md transition-all"
            >
              Contact Sales
            </button>
            <button
              onClick={resetDemo}
              className="px-6 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-100 transition-all"
            >
              Reset
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}