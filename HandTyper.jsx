import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─── PASSAGE DATA ───────────────────────────────────────────────────────────
const PASSAGES = [
  {
    text: "Computerized typing interventions significantly improve manual dexterity in children. An online interactive typing intervention over four weeks led to significant improvements in standardized manual dexterity scores compared to controls, demonstrating that game-based typing exercises can enhance fine motor skills.",
    source: "Improvement in Children's Fine Motor Skills Following a Computerized Typing Intervention",
    authors: "McGlashan HL, Blanchard CCV, Sycamore NJ, et al.",
    journal: "Human Movement Science",
    year: 2017,
    note: "4 weeks of typing games measurably improved children's fine motor scores.",
  },
  {
    text: "Habitual players of highly interactive games showed significantly better performance in precision of arm-hand movements compared to non-players, suggesting computer games positively influence psychomotor functioning. Players showed lower error rates and shorter task completion times.",
    source: "Computer Games and Fine Motor Skills",
    authors: "Borecki L, Tolstych K, Pokorski M.",
    journal: "Advances in Experimental Medicine and Biology",
    year: 2012,
    note: "Gamers had 33% lower error rates and completed tasks 2x faster than non-gamers.",
  },
  {
    text: "Manual alternation between hands is faster than manual repetition. Skilled typists demonstrate faster interkeystroke intervals when alternating between hands, due to parallel activation of successive keystrokes. This pattern holds true for both traditional keyboard typing and mobile typing when using two thumbs.",
    source: "Two Thumbs and One Index: A Comparison of Manual Coordination in Touch-Typing and Mobile-Typing",
    authors: "Cerni T, Longcamp M, Job R.",
    journal: "Acta Psychologica",
    year: 2016,
    note: "Alternating hands triggers parallel motor planning, reducing keystroke delay.",
  },
  {
    text: "Standard typists who use more fingers consistently achieve better speed and accuracy than nonstandard typists, particularly when visual guidance is reduced. The number of fingers used and consistency of finger-key mapping are strong predictors of typing performance.",
    source: "Different (Key)strokes for Different Folks: How Standard and Nonstandard Typists Balance Fitts' Law and Hick's Law",
    authors: "Logan GD, Ulrich JE, Lindsey DR.",
    journal: "Journal of Experimental Psychology: Human Perception and Performance",
    year: 2016,
    note: "Finger count and consistent key mapping predict typing speed more than raw practice.",
  },
  {
    text: "Sequential typing movements activate multiple brain regions including bilateral primary motor cortex, supplementary motor area, premotor areas, and somatosensory and parietal regions. These activations relate to both the spatial and temporal requirements of the typing task.",
    source: "Functional MRI of Motor, Sensory, and Posterior Parietal Cortical Areas During Sequential Typing",
    authors: "Gordon AM, Lee JH, Flament D, Ugurbil K, Ebner TJ.",
    journal: "Experimental Brain Research",
    year: 1998,
    note: "Typing engages at least 5 distinct brain regions simultaneously for spatial-temporal control.",
  },
  {
    text: "Metacarpophalangeal and proximal interphalangeal joint angles, velocities, and accelerations can be measured during typing, with differences between fingers potentially relating to injury risk. Hand and wrist displacement also occurs as a translational repositioning movement during typing.",
    source: "Kinematics of the Fingers and Hands During Computer Keyboard Use",
    authors: "Baker NA, Cham R, Cidboy EH, Cook J, Redfern MS.",
    journal: "Clinical Biomechanics",
    year: 2006,
    note: "Each finger has a unique kinematic signature during typing that predicts injury risk.",
  },
  {
    text: "Keyboard playing requiring precise dexterous finger manipulation showed significant improvements in hand function, particularly in tasks requiring fine motor control. Movement-specific keyboard training was effective for adolescents and young adults with acquired brain injury.",
    source: "Movement-Specific Keyboard Playing for Hand Function in Acquired Brain Injury",
    authors: "Kim SJ, Shin YK, Jeong E, Cho SR.",
    journal: "Frontiers in Neurology",
    year: 2023,
    note: "Keyboard-based therapy improved fine motor scores even after acquired brain injury.",
  },
  {
    text: "Action observation plus motor imagery and somatosensory discrimination training both produced greater improvements in manual dexterity than no intervention, with very large effect sizes. These non-motor approaches can meaningfully improve hand function without direct physical practice.",
    source: "Action Observation Plus Motor Imagery and Somatosensory Discrimination Training Improve Manual Dexterity",
    authors: "Agnelli M, Libeccio B, Frisoni MC, et al.",
    journal: "Journal of Hand Therapy",
    year: 2022,
    note: "Watching and imagining hand movements improved dexterity almost as much as physical training.",
  },
  {
    text: "Digital tablet tasks assessing finger recognition, rhythm tapping, multi-finger tapping, sequence tapping, and line-tracking show good-to-excellent reliability for most timing measures. These tasks also correlate with age-related performance decline in manual dexterity.",
    source: "A Novel Tablet-Based Application for Assessment of Manual Dexterity and Its Components",
    authors: "Rabah A, Le Boterff Q, Carment L, et al.",
    journal: "Journal of Neuroengineering and Rehabilitation",
    year: 2022,
    note: "Tapping rhythm and sequence tests reliably detect dexterity loss across age groups.",
  },
  {
    text: "Gaming interventions for upper extremity rehabilitation improve range of motion, muscle strength, motivation, and adherence. Various platforms including Leap Motion, Nintendo Wii, Kinect, and Oculus have been used successfully for hand rehabilitation.",
    source: "The Role of Gaming Technology for Upper Extremity Rehabilitation",
    authors: "George CM, Raeesi J, Dabbagh A, Szekeres M, MacDermid JC.",
    journal: "Journal of Hand Therapy",
    year: 2025,
    note: "Game-based rehab improves both physical outcomes and patient adherence vs. standard care.",
  },
  {
    text: "The dominant hand consistently demonstrates better range of motion, grip strength, and dexterity compared to the non-dominant hand, and performance declines with age. Targeted training of the non-dominant hand can reduce this asymmetry over time.",
    source: "Influence of Aging, Disease, Exercise, and Injury on Human Hand Movements",
    authors: "Sankar K, Michael Christudhas JC.",
    journal: "Proceedings of the Institution of Mechanical Engineers, Part H",
    year: 2021,
    note: "Hand dominance is real and measurable — but trainable non-dominant practice reduces the gap.",
  },
  {
    text: "Distributed practice is superior to massed practice for motor skill learning. Distributed practice with breaks between practice sessions consistently outperforms massed practice without breaks for retention and long-term learning. In one study, distributed practice showed a 19% improvement over massed practice on retention tests. The benefits appear most pronounced in early and late learning phases.",
    source: "Practice Distribution in Procedural Skills Training: A Randomized Controlled Trial",
    authors: "Mackay S, Morgan P, Datta V, Chang A, Darzi A.",
    journal: "Surgical Endoscopy",
    year: 2002,
    note: "Taking breaks between practice sessions improves retention by 19% over continuous practice.",
  },
  {
    text: "Optimal rest intervals depend on task type. For discrete motor tasks like typing individual sequences, shorter inter-trial intervals of 2 seconds promote better memory consolidation than longer intervals of 30 seconds. However, for continuous tasks requiring sustained performance, longer rest breaks are beneficial. Rest periods of 3 minutes between trials maintain grip strength better than 30-second breaks, with strength declining 7.8% vs 13% respectively.",
    source: "Effects of the Resting Time Associated With the Number of Trials on the Total and Individual Finger Forces in a Maximum Grasping Task",
    authors: "Lim CM, Kong YK.",
    journal: "Applied Ergonomics",
    year: 2014,
    note: "Short 2-second gaps between typing drills consolidate memory better than longer pauses.",
  },
  {
    text: "Progressive difficulty enhances learning and neural plasticity. Training with progressively increasing task difficulty produces superior motor learning compared to constant difficulty levels. Progressive practice induces repeated increases in corticospinal excitability across multiple training days, while constant practice only shows increases on the first day. This suggests that adaptive difficulty is key to sustained improvement.",
    source: "Progressive Practice Promotes Motor Learning and Repeated Transient Increases in Corticospinal Excitability Across Multiple Days",
    authors: "Christiansen L, Madsen MJ, Bojsen-Møller E, et al.",
    journal: "Brain Stimulation",
    year: 2017,
    note: "Gradually increasing difficulty triggers neural plasticity that flat difficulty cannot sustain.",
  },
  {
    text: "Training without online visual feedback enhances feedforward control. Paradoxically, practicing without continuous visual feedback of hand movements leads to greater improvement in feedforward motor control and faster movement execution. Training with only post-trial feedback produces better performance at fast speeds compared to training with continuous visual feedback.",
    source: "Motor Skill Training Without Online Visual Feedback Enhances Feedforward Control",
    authors: "Raichin A, Shkedy Rabani A, Shmuelof L.",
    journal: "Journal of Neurophysiology",
    year: 2021,
    note: "Practicing without watching your hands builds faster, more automatic motor control.",
  },
  {
    text: "Visual feedback increases motor complexity and adaptability. When visual feedback is provided, both motor performance complexity and neural signal complexity increase, particularly in brain regions associated with sensorimotor processing in alpha and beta frequency bands in parietal and occipital regions. This indicates visual feedback enhances the information available for generating adaptive motor output.",
    source: "Visual Feedback During Motor Performance Is Associated With Increased Complexity and Adaptability of Motor and Neural Output",
    authors: "Shafer RL, Solomon EM, Newell KM, Lewis MH, Bodfish JW.",
    journal: "Behavioural Brain Research",
    year: 2019,
    note: "Visual feedback makes motor output more complex and adaptable at the neural level.",
  },
  {
    text: "Congruent visual feedback facilitates learning while incongruent feedback impairs it. Training with congruent visual feedback of seeing correct hand movements produces significantly higher performance gains than training without feedback, while incongruent feedback of seeing mismatched movements significantly reduces gains. Individual sensitivity to feedback congruency varies and correlates with supplementary motor area activation.",
    source: "Behavioral and Neural Effects of Congruency of Visual Feedback During Short-Term Motor Learning",
    authors: "Ossmy O, Mukamel R.",
    journal: "NeuroImage",
    year: 2018,
    note: "Seeing correct movements helps learning; seeing wrong movements actively hurts it.",
  },
  {
    text: "Faded feedback schedules are optimal. High-frequency augmented feedback during acquisition can be detrimental to learning because learners become dependent on it. A faded schedule where feedback frequency decreases over time produces better retention and transfer than constant high-frequency feedback. Starting with frequent guidance and gradually removing it builds independent skill.",
    source: "Effects of Physical Guidance and Knowledge of Results on Motor Learning: Support for the Guidance Hypothesis",
    authors: "Winstein CJ, Pohl PS, Lewthwaite R.",
    journal: "Research Quarterly for Exercise and Sport",
    year: 1994,
    note: "Gradually reducing feedback over time builds stronger independent skill than constant guidance.",
  },
  {
    text: "Task-specific training improves targeted dexterity measures. Training focused on specific dexterity tasks like finger strengthening with therapy putty and goal-based practice produces greater improvements in pinch and grip strength and dexterity tests compared to general exercise programs. Specificity of practice is a core principle of motor learning.",
    source: "Physical Therapist Management of Parkinson Disease: A Clinical Practice Guideline",
    authors: "Osborne JA, Botkin R, Colon-Semenza C, et al.",
    journal: "Physical Therapy",
    year: 2022,
    note: "Practicing the exact skill you want to improve beats general exercise every time.",
  },
  {
    text: "Strength-focused hand training yields large dexterity improvements. Hand-focused strength and proprioceptive training produces large improvements in manual dexterity with an effect size of 1.11 and moderate improvements in grip strength with an effect size of 0.44, with greater effects observed in older adults. Combining strength with body-awareness training amplifies results.",
    source: "Hand-Focused Strength and Proprioceptive Training for Improving Grip Strength and Manual Dexterity in Healthy Adults",
    authors: "Akbaş A.",
    journal: "Journal of Clinical Medicine",
    year: 2025,
    note: "Hand strength training produces large dexterity gains, especially in older adults.",
  },
  {
    text: "Haptic perception training enhances fine motor control. Training programs emphasizing haptic perception including texture recognition and two-point discrimination produce greater improvements in fine motor tasks than standard occupational therapy, with particular benefits for fine motor integration, precision, and manual dexterity. Sensing more leads to moving better.",
    source: "Haptic Perception Training Programs on Fine Motor Control in Adolescents With Developmental Coordination Disorder",
    authors: "Wuang YP, Huang CL, Wu CS.",
    journal: "Journal of Clinical Medicine",
    year: 2022,
    note: "Training your fingertips to feel more precisely directly improves motor control.",
  },
  {
    text: "Hand rest and wrist support prevent muscle fatigue. Using hand rests during typing reduces extensor digitorum communis fatigue by 24%, while wrist supports reduce biceps brachii fatigue by 32% during prolonged typing. Proper ergonomic support is not optional but essential for sustained typing performance and injury prevention.",
    source: "Hand Rest and Wrist Support Are Effective in Preventing Fatigue During Prolonged Typing",
    authors: "Callegari B, de Resende MM, da Silva Filho M.",
    journal: "Journal of Hand Therapy",
    year: 2017,
    note: "Wrist supports cut forearm fatigue by 24-32% during long typing sessions.",
  },
  {
    text: "Optimal rate-rest profiles maximize performance and minimize injury. Job parameters can be optimized so that appropriate work rates combined with strategic rest breaks both decrease repetitive motion disorders and increase productivity. The key insight is that rest is not lost productivity but an investment in sustained output.",
    source: "Repetitive Motion Disorders: The Design of Optimal Rate-Rest Profiles",
    authors: "Fisher DL, Andres RO, Airth D, Smith SS.",
    journal: "Human Factors",
    year: 1993,
    note: "Strategic rest breaks simultaneously reduce injury risk and increase total productivity.",
  },
  {
    text: "Differential finger movements increase injury risk. Repetitive tasks requiring individual finger movements create 20.4% greater shear strain between flexor tendons and connective tissue over 30 minutes compared to concurrent multi-finger movements. Varying movement patterns helps distribute mechanical load across different tissue structures.",
    source: "Repetitive Differential Finger Motion Increases Shear Strain Between the Flexor Tendon and Subsynovial Connective Tissue",
    authors: "Tat J, Kociolek AM, Keir PJ.",
    journal: "Journal of Orthopaedic Research",
    year: 2013,
    note: "Single-finger repetitive motions create 20% more tendon strain than multi-finger movements.",
  },
  {
    text: "Curved finger positions minimize joint forces. Using curved finger positions with large metacarpophalangeal flexion and small proximal interphalangeal flexion reduces flexor tendon tension and joint forces by 2 to 7 times compared to extended positions. Typing with naturally curved fingers is biomechanically optimal.",
    source: "Finger Joint Force Minimization in Pianists Using Optimization Techniques",
    authors: "Harding DC, Brandt KD, Hillberry BM.",
    journal: "Journal of Biomechanics",
    year: 1993,
    note: "Curved finger posture reduces joint forces by up to 7x compared to flat extended fingers.",
  },
  {
    text: "Motor skills consolidate in stages: fast learning, consolidation, then slow learning. Initial within-session improvement is followed by a consolidation period of several hours, then incremental gains emerge with continued practice. Sleep plays a critical role in the consolidation phase, transferring motor memories from temporary to permanent storage.",
    source: "The Acquisition of Skilled Motor Performance: Fast and Slow Experience-Driven Changes in Primary Motor Cortex",
    authors: "Karni A, Meyer G, Rey-Hipolito C, et al.",
    journal: "Proceedings of the National Academy of Sciences",
    year: 1998,
    note: "Motor learning happens in three phases — fast gains, sleep consolidation, then slow refinement.",
  },
  {
    text: "Brief memory reactivations can induce learning. Motor skill learning can be achieved through brief 30-second reactivations on separate days, but only when reactivations are highly continuous with many correct sequences. High-continuity reactivations produce learning gains similar to full practice sessions, making micro-practice viable.",
    source: "Reactivation-Induced Motor Skill Learning",
    authors: "Herszage J, Sharon H, Censor N.",
    journal: "Proceedings of the National Academy of Sciences",
    year: 2021,
    note: "30-second focused bursts across days can match full practice sessions for motor learning.",
  },
  {
    text: "Random practice schedules enhance cognitive engagement. Random practice with varying tasks results in more effective motor learning than blocked practice of repeating the same task, with greater involvement of premotor areas, dorsolateral prefrontal cortex, and posterior parietal cortex. The added challenge of switching tasks strengthens neural encoding.",
    source: "Repetition and Variation in Motor Practice: A Review of Neural Correlates",
    authors: "Lage GM, Ugrinowitsch H, Apolinário-Souza T, et al.",
    journal: "Neuroscience and Biobehavioral Reviews",
    year: 2015,
    note: "Mixing different tasks during practice produces stronger learning than repeating one task.",
  },
  {
    text: "Non-motor approaches enhance dexterity with very large effect sizes. Action observation combined with motor imagery and somatosensory discrimination training both produce improvements in manual dexterity with effect sizes of 1.7 to 1.8 compared to no intervention. You can improve hand skill without moving your hands at all.",
    source: "Action Observation Plus Motor Imagery and Somatosensory Discrimination Training Improve Manual Dexterity",
    authors: "Agnelli M, Libeccio B, Frisoni MC, et al.",
    journal: "Journal of Hand Therapy",
    year: 2022,
    note: "Watching and imagining hand movements improved dexterity almost as much as physical training.",
  },
  {
    text: "Augmented feedback through visual, auditory, haptic, or combined modalities can effectively enhance motor learning, with different modalities suited to different aspects of the task. Multimodal feedback combining multiple senses produces more robust learning than any single channel alone, especially for complex sequential movements like typing.",
    source: "Augmented Visual, Auditory, Haptic, and Multimodal Feedback in Motor Learning: A Review",
    authors: "Sigrist R, Rauter G, Riener R, Wolf P.",
    journal: "Psychonomic Bulletin & Review",
    year: 2013,
    note: "Combining visual, audio, and touch feedback accelerates motor learning beyond any single sense.",
  },
];

// ─── WORD GENERATION ────────────────────────────────────────────────────────
// Each word token tracks which passage it belongs to
function buildWordPool() {
  const pool = [];
  PASSAGES.forEach((p, idx) => {
    const words = p.text.split(/\s+/).filter(Boolean);
    words.forEach((w) => pool.push({ word: w, passageIdx: idx }));
  });
  return pool;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateWordsForWordMode(count) {
  let pool = shuffle(buildWordPool());
  const result = [];
  let idx = 0;
  while (result.length < count) {
    if (idx >= pool.length) { pool = shuffle(buildWordPool()); idx = 0; }
    result.push(pool[idx++]);
  }
  return result;
}

function generateWordsForTimeMode(startPassage = 0) {
  // Cycle through passages in order starting from startPassage
  // One full loop is enough (~1500 words covers even 120s at 200+ WPM)
  const result = [];
  for (let i = 0; i < PASSAGES.length; i++) {
    const pi = (startPassage + i) % PASSAGES.length;
    const words = PASSAGES[pi].text.split(/\s+/).filter(Boolean);
    words.forEach((w) => result.push({ word: w, passageIdx: pi }));
  }
  return result;
}

// ─── FONT + CSS INJECTION ───────────────────────────────────────────────────
const FONT_INJECTED = { current: false };
function injectFont() {
  if (FONT_INJECTED.current) return;
  FONT_INJECTED.current = true;
  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap');
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes slideIn { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes crossfade { from{opacity:0} to{opacity:1} }
    @keyframes swipeUp { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }
    @keyframes swipeDown { from{transform:translateY(-30px);opacity:0} to{transform:translateY(0);opacity:1} }
    *::-webkit-scrollbar { display:none }
    * { scrollbar-width:none; box-sizing:border-box; }
  `;
  document.head.appendChild(style);
}

// ─── COLORS ─────────────────────────────────────────────────────────────────
const C = {
  bg: "#0d0d0d",
  text: "#444",
  active: "#f0f0f0",
  correct: "#4caf81",
  incorrect: "#c0574a",
  amber: "#f5a623",
  muted: "#333",
  faint: "#1e1e1e",
  refText: "#555",
  refTitle: "#888",
};

// ─── QWERTY LAYOUT + FINGER MAPPING ─────────────────────────────────────────
const QWERTY_ROWS = [
  ["q","w","e","r","t","y","u","i","o","p"],
  ["a","s","d","f","g","h","j","k","l"],
  ["z","x","c","v","b","n","m"],
];

// Standard touch-typing finger assignments
// L = left hand, R = right hand
const FINGER_MAP = {
  q: "L pinky", a: "L pinky", z: "L pinky",
  w: "L ring", s: "L ring", x: "L ring",
  e: "L middle", d: "L middle", c: "L middle",
  r: "L index", f: "L index", v: "L index", t: "L index", g: "L index", b: "L index",
  y: "R index", h: "R index", n: "R index", u: "R index", j: "R index", m: "R index",
  i: "R middle", k: "R middle",
  o: "R ring", l: "R ring",
  p: "R pinky",
};

const FINGER_LABELS = {
  "L pinky": "left pinky",
  "L ring": "left ring",
  "L middle": "left middle",
  "L index": "left index",
  "R index": "right index",
  "R middle": "right middle",
  "R ring": "right ring",
  "R pinky": "right pinky",
};

function getWeakFingers(missedKeys) {
  const fingerMisses = {};
  Object.entries(missedKeys).forEach(([key, count]) => {
    const finger = FINGER_MAP[key.toLowerCase()];
    if (finger) {
      fingerMisses[finger] = (fingerMisses[finger] || 0) + count;
    }
  });
  return Object.entries(fingerMisses)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([finger, count]) => ({ finger, label: FINGER_LABELS[finger], count }));
}

// ─── SPARKLINE COMPONENT ────────────────────────────────────────────────────
function Sparkline({ data, width = 200, height = 48, color = C.amber, showDots = false, showEndLabels = false }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const pad = 4;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * (width - pad * 2) + pad,
    y: height - ((v - min) / range) * (height - pad * 2) - pad,
  }));
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke={C.muted} strokeWidth="0.5" />
      <polyline points={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {showDots && pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2" fill={color} />
      ))}
      {showEndLabels && (
        <>
          <text x={pts[0].x} y={pts[0].y - 6} fill={C.refText} fontSize="9" fontFamily="'JetBrains Mono', monospace" textAnchor="start">{data[0]}</text>
          <text x={pts[pts.length-1].x} y={pts[pts.length-1].y - 6} fill={C.refText} fontSize="9" fontFamily="'JetBrains Mono', monospace" textAnchor="end">{data[data.length-1]}</text>
        </>
      )}
    </svg>
  );
}

// ─── KEYBOARD HEATMAP COMPONENT ─────────────────────────────────────────────
function KeyboardHeatmap({ missedKeys }) {
  const maxMiss = Math.max(...Object.values(missedKeys), 1);
  const keySize = 32;
  const gap = 3;

  function keyColor(key) {
    const count = missedKeys[key] || 0;
    if (count === 0) return "#1a1a2e";
    const t = count / maxMiss;
    // Interpolate from dark blue to amber
    const r = Math.round(26 + t * (245 - 26));
    const g = Math.round(26 + t * (166 - 26));
    const b = Math.round(46 + t * (35 - 46));
    return `rgb(${r},${g},${b})`;
  }

  const rowOffsets = [0, 16, 32];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: `${gap}px` }}>
      {QWERTY_ROWS.map((row, ri) => (
        <div key={ri} style={{ display: "flex", gap: `${gap}px`, marginLeft: `${rowOffsets[ri]}px` }}>
          {row.map((key) => (
            <div key={key} style={{
              width: `${keySize}px`,
              height: `${keySize}px`,
              background: keyColor(key),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.65rem",
              color: (missedKeys[key] || 0) > maxMiss * 0.5 ? "#0d0d0d" : C.refText,
              fontFamily: "'JetBrains Mono', monospace",
              borderRadius: "3px",
            }}>
              {key}
            </div>
          ))}
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px", fontSize: "0.6rem", color: C.muted }}>
        <div style={{ width: "12px", height: "8px", background: "#1a1a2e", borderRadius: "1px" }} />
        <span>no errors</span>
        <div style={{ width: "40px", height: "8px", borderRadius: "1px",
          background: "linear-gradient(to right, #1a1a2e, #f5a623)" }} />
        <span>most errors</span>
      </div>
      {(() => {
        const weak = getWeakFingers(missedKeys);
        if (weak.length === 0) return null;
        return (
          <div style={{ marginTop: "10px", fontSize: "0.68rem", color: C.refText, textAlign: "center", lineHeight: 1.6 }}>
            {weak.length === 1
              ? <>Focus on your <span style={{ color: C.amber }}>{weak[0].label}</span> finger — {weak[0].count} missed key{weak[0].count !== 1 ? "s" : ""} mapped to it.</>
              : <>Your <span style={{ color: C.amber }}>{weak[0].label}</span> ({weak[0].count} misses) and <span style={{ color: C.amber }}>{weak[1].label}</span> ({weak[1].count} misses) need the most coordination work.</>
            }
          </div>
        );
      })()}
    </div>
  );
}

// ─── REFERENCE PANEL ────────────────────────────────────────────────────────
function ReferencePanel({ passageIdx, fadeKey, direction = "down" }) {
  if (passageIdx == null || passageIdx < 0 || passageIdx >= PASSAGES.length) return null;
  const p = PASSAGES[passageIdx];
  const anim = direction === "up" ? "swipeUp" : "swipeDown";
  return (
    <div key={fadeKey} style={{
      animation: `${anim} 0.3s ease`,
      padding: "24px 20px",
    }}>
      <div style={{ fontSize: "0.72rem", color: C.refText, lineHeight: 1.6, marginBottom: "16px" }}>
        {p.text}
      </div>
      <div style={{ fontSize: "0.72rem", color: C.refTitle, fontWeight: 500, marginBottom: "6px", lineHeight: 1.4 }}>
        {p.source}
      </div>
      <div style={{ fontSize: "0.65rem", color: C.refText, marginBottom: "4px", lineHeight: 1.4 }}>
        {p.authors}
      </div>
      <div style={{ fontSize: "0.65rem", color: C.muted, marginBottom: "12px" }}>
        {p.journal}, {p.year}
      </div>
      <div style={{
        fontSize: "0.68rem",
        color: C.amber,
        fontStyle: "italic",
        lineHeight: 1.5,
        opacity: 0.8,
      }}>
        {p.note}
      </div>
    </div>
  );
}

// ─── SHORTCUT BAR ───────────────────────────────────────────────────────────
function ShortcutBar() {
  return (
    <div style={{
      padding: "16px",
      fontSize: "0.65rem",
      color: C.muted,
      textAlign: "center",
      letterSpacing: "0.5px",
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      Tab+Enter restart &nbsp;&middot;&nbsp; Esc reset &nbsp;&middot;&nbsp; Tab+&#x2191;/&#x2193; browse research &nbsp;&middot;&nbsp; Tab+1/2 mode &nbsp;&middot;&nbsp; Tab+T show/hide timer &nbsp;&middot;&nbsp; Ctrl+H history
    </div>
  );
}

// ─── TOP BAR ────────────────────────────────────────────────────────────────
function TopBar({ mode, setMode, showAbout, setShowAbout, timeDuration, setTimeDuration, wordCount, setWordCount, onRestart }) {
  const timeOptions = [15, 30, 60, 120];
  const wordOptions = [10, 25, 50, 100];
  const btnStyle = (active) => ({
    background: "none",
    border: "none",
    color: active ? C.amber : C.text,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.85rem",
    cursor: "pointer",
    padding: "4px 8px",
    transition: "color 0.15s",
  });
  const optStyle = (active) => ({
    background: "none",
    border: "none",
    color: active ? C.active : C.muted,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.8rem",
    cursor: "pointer",
    padding: "2px 6px",
    transition: "color 0.15s",
  });
  return (
    <div style={{ display: "flex", gap: "32px", alignItems: "center", justifyContent: "center", padding: "24px 0 16px", fontSize: "0.85rem", fontFamily: "'JetBrains Mono', monospace" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <button style={btnStyle(showAbout)} onClick={() => setShowAbout(true)}>about</button>
        <button style={btnStyle(!showAbout && mode === "time")} onClick={() => { setShowAbout(false); setMode("time"); onRestart(true, "time"); }}>time</button>
        <button style={btnStyle(!showAbout && mode === "words")} onClick={() => { setShowAbout(false); setMode("words"); onRestart(true, "words"); }}>words</button>
      </div>
      {!showAbout && (
        <div style={{ display: "flex", gap: "4px" }}>
          {mode === "time"
            ? timeOptions.map((t) => (
                <button key={t} style={optStyle(timeDuration === t)} onClick={() => { setTimeDuration(t); onRestart(true, "time"); }}>{t}</button>
              ))
            : wordOptions.map((w) => (
                <button key={w} style={optStyle(wordCount === w)} onClick={() => { setWordCount(w); onRestart(true, "words"); }}>{w}</button>
              ))}
        </div>
      )}
    </div>
  );
}

// ─── ABOUT SCREEN ───────────────────────────────────────────────────────────
function AboutScreen() {
  const h = { color: C.amber, fontSize: "1.4rem", fontWeight: 700, marginBottom: "12px" };
  const p = { color: C.refText, fontSize: "0.82rem", lineHeight: 1.7, marginBottom: "16px", maxWidth: "540px" };
  const small = { color: C.muted, fontSize: "0.72rem", lineHeight: 1.6 };
  const key = { display: "inline-block", color: C.active, background: "#1a1a1a", padding: "1px 6px", borderRadius: "3px", fontSize: "0.7rem", margin: "0 2px" };
  return (
    <div style={{ animation: "fadeIn 0.3s ease", padding: "40px 32px", maxWidth: "640px" }}>
      <div style={h}>Daedalus Digits</div>
      <div style={p}>
        A typing game grounded in motor science research. Every passage you type is drawn from
        peer-reviewed studies on hand dexterity, motor learning, and typing biomechanics.
        The reference panel on the right shows the full citation and a key finding as you type.
      </div>
      <div style={p}>
        Built to help you type faster while learning how your hands actually work — from
        finger independence and neural pathway myelination to optimal practice distribution
        and injury prevention.
      </div>
      <div style={{ ...p, color: C.refTitle, fontSize: "0.78rem" }}>
        Shortcuts
      </div>
      <div style={{ ...small, marginBottom: "20px" }}>
        <span style={key}>Tab</span>+<span style={key}>Enter</span> restart same test<br/>
        <span style={key}>Esc</span> reset with new words<br/>
        <span style={key}>Tab</span>+<span style={key}>1</span>/<span style={key}>2</span> switch time/word mode<br/>
        <span style={key}>Tab</span>+<span style={key}>↑</span>/<span style={key}>↓</span> browse research (hold Tab, press arrows)<br/>
        <span style={key}>Tab</span>+<span style={key}>T</span> show/hide timer<br/>
        <span style={key}>Ctrl</span>+<span style={key}>H</span> session history<br/>
        <span style={key}>Ctrl</span>+<span style={key}>Backspace</span> delete whole word
      </div>
      <div style={{ ...p, color: C.refTitle, fontSize: "0.78rem" }}>
        How it works
      </div>
      <div style={small}>
        Choose <span style={{ color: C.amber }}>time</span> mode (15–120s countdown) or <span style={{ color: C.amber }}>words</span> mode (10–100 words).
        Characters light up <span style={{ color: C.correct }}>green</span> for correct, <span style={{ color: C.incorrect }}>red</span> for incorrect.
        Backspace works within the current word. After each test, review your WPM, accuracy,
        a per-second sparkline, and a key heatmap showing which fingers need work.
        Browse through {PASSAGES.length} research passages at any time with Tab+arrows.
      </div>
    </div>
  );
}

// ─── RESULTS SCREEN ─────────────────────────────────────────────────────────
function ResultsScreen({ results, wpmHistory, missedKeys, onRestartSame, onNewTest }) {
  if (!results) return null;
  const statBig = { fontSize: "3rem", fontWeight: 700, color: C.amber, lineHeight: 1.2 };
  const statLabel = { fontSize: "0.7rem", color: C.muted, textTransform: "uppercase", letterSpacing: "1px", marginTop: "4px" };
  const statSmall = { fontSize: "1rem", color: C.text };
  const btnStyle = {
    background: "none", border: "none", fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.85rem", cursor: "pointer", padding: "4px 12px", transition: "color 0.15s",
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.3s ease", width: "100%", padding: "20px 0",
    }}>
      {/* Big stats - stagger 0ms */}
      <div style={{ display: "flex", gap: "64px", alignItems: "flex-end", marginBottom: "32px", animation: "fadeIn 0.4s ease" }}>
        <div style={{ textAlign: "center" }}>
          <div style={statBig}>{results.wpm}</div>
          <div style={statLabel}>wpm</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={statBig}>{results.accuracy}%</div>
          <div style={statLabel}>accuracy</div>
        </div>
      </div>

      {/* Small stats row */}
      <div style={{ display: "flex", gap: "28px", marginBottom: "28px", animation: "fadeIn 0.4s ease 0.05s both" }}>
        <div style={{ textAlign: "center" }}>
          <div style={statSmall}>{results.rawWpm}</div>
          <div style={statLabel}>raw wpm</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ ...statSmall, color: C.correct }}>{results.correct}</div>
          <div style={statLabel}>correct</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ ...statSmall, color: C.incorrect }}>{results.incorrect}</div>
          <div style={statLabel}>incorrect</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={statSmall}>{results.extra}</div>
          <div style={statLabel}>extra</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={statSmall}>{results.seconds}s</div>
          <div style={statLabel}>time</div>
        </div>
      </div>

      {/* Sparkline - stagger 150ms */}
      {wpmHistory.length > 1 && (
        <div style={{ marginBottom: "28px", width: "100%", maxWidth: "500px", animation: "fadeIn 0.4s ease 0.15s both" }}>
          <Sparkline data={wpmHistory} width={500} height={48} showDots showEndLabels />
        </div>
      )}

      {/* Heatmap - stagger 300ms */}
      <div style={{ marginBottom: "28px", animation: "fadeIn 0.4s ease 0.3s both" }}>
        <div style={{ ...statLabel, marginBottom: "12px", textAlign: "center" }}>miss heatmap</div>
        <KeyboardHeatmap missedKeys={missedKeys} />
      </div>

      {/* Buttons - stagger 450ms */}
      <div style={{ display: "flex", gap: "16px", animation: "fadeIn 0.4s ease 0.45s both" }}>
        <button style={{ ...btnStyle, color: C.amber }} onClick={onRestartSame}>
          restart &nbsp;[Tab+Enter]
        </button>
        <button style={{ ...btnStyle, color: C.text }} onClick={onNewTest}>
          new test &nbsp;[Esc]
        </button>
      </div>
    </div>
  );
}

// ─── SESSION PANEL ──────────────────────────────────────────────────────────
function SessionPanel({ sessionHistory, onClose }) {
  const stats = useMemo(() => {
    if (sessionHistory.length === 0) return null;
    const wpms = sessionHistory.map((t) => t.wpm);
    const accs = sessionHistory.map((t) => t.accuracy);
    // Aggregate missed keys
    const allMissed = {};
    sessionHistory.forEach((t) => {
      if (t.missedKeys) {
        Object.entries(t.missedKeys).forEach(([k, v]) => {
          allMissed[k] = (allMissed[k] || 0) + v;
        });
      }
    });
    const topMissed = Object.entries(allMissed).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return {
      avg: Math.round(wpms.reduce((a, b) => a + b, 0) / wpms.length),
      best: Math.max(...wpms),
      total: sessionHistory.length,
      wpmTrend: wpms,
      accTrend: accs,
      topMissed,
    };
  }, [sessionHistory]);

  if (!stats) return (
    <div style={{
      position: "fixed", top: 0, right: 0, width: "30%", height: "100vh",
      background: C.faint, zIndex: 20, animation: "slideIn 0.2s ease",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <div style={{ color: C.muted, fontSize: "0.8rem" }}>No tests completed yet.</div>
    </div>
  );

  const label = { fontSize: "0.7rem", color: C.muted, textTransform: "uppercase", letterSpacing: "1px", marginTop: "4px" };

  return (
    <div style={{
      position: "fixed", top: 0, right: 0, width: "30%", height: "100vh",
      background: C.faint, padding: "28px 20px", zIndex: 20,
      animation: "slideIn 0.2s ease",
      display: "flex", flexDirection: "column", gap: "18px", overflowY: "auto",
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <div style={{ fontSize: "0.75rem", color: C.muted, textTransform: "uppercase", letterSpacing: "1px" }}>Session Stats</div>
      <div>
        <div style={{ color: C.amber, fontSize: "1.8rem", fontWeight: 700 }}>{stats.avg}</div>
        <div style={label}>avg wpm</div>
      </div>
      <div>
        <div style={{ color: C.amber, fontSize: "1.4rem", fontWeight: 500 }}>{stats.best}</div>
        <div style={label}>best wpm</div>
      </div>
      <div>
        <div style={{ color: C.text, fontSize: "1rem" }}>{stats.total}</div>
        <div style={label}>tests taken</div>
      </div>
      {stats.accTrend.length > 1 && (
        <div>
          <div style={{ ...label, marginBottom: "8px" }}>accuracy trend</div>
          <Sparkline data={stats.accTrend} width={220} height={36} />
        </div>
      )}
      {stats.wpmTrend.length > 1 && (
        <div>
          <div style={{ ...label, marginBottom: "8px" }}>wpm trend</div>
          <Sparkline data={stats.wpmTrend} width={220} height={36} />
        </div>
      )}
      {stats.topMissed.length > 0 && (
        <div>
          <div style={{ ...label, marginBottom: "8px" }}>most missed keys</div>
          {stats.topMissed.map(([key, count]) => (
            <div key={key} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: C.refText, marginBottom: "4px" }}>
              <span style={{ color: C.amber }}>{key}</span>
              <span>{count}</span>
            </div>
          ))}
        </div>
      )}
      <button style={{
        background: "none", border: "none", color: C.muted, fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.7rem", cursor: "pointer", marginTop: "auto", padding: "4px",
      }} onClick={onClose}>
        close (Ctrl+H)
      </button>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────
export default function HandTyper() {
  injectFont();

  // Mode
  const [mode, setMode] = useState("time");
  const [showAbout, setShowAbout] = useState(false);
  const [timeDuration, setTimeDuration] = useState(30);
  const [wordCount, setWordCount] = useState(25);

  // Word tokens: [{word, passageIdx}]
  const [wordTokens, setWordTokens] = useState(() => generateWordsForTimeMode());

  // Test state
  const [charStates, setCharStates] = useState([]);
  const [charPassageMap, setCharPassageMap] = useState([]); // passageIdx per char
  const [cursorPos, setCursorPos] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [liveWpm, setLiveWpm] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [elapsed, setElapsed] = useState(0);
  const [wpmHistory, setWpmHistory] = useState([]);
  const [missedKeys, setMissedKeys] = useState({});
  const [showTimer, setShowTimer] = useState(true);
  // Total keypress counts (never reset by backspace)
  const totalCorrectRef = useRef(0);
  const totalIncorrectRef = useRef(0);
  const [activePassageIdx, setActivePassageIdx] = useState(0);
  const [refFadeKey, setRefFadeKey] = useState(0);
  const [browsePassageIdx, _setBrowsePassageIdx] = useState(null); // null = follow cursor
  const browsePassageIdxRef = useRef(null);
  const setBrowsePassageIdx = useCallback((valOrFn) => {
    _setBrowsePassageIdx((prev) => {
      const next = typeof valOrFn === "function" ? valOrFn(prev) : valOrFn;
      browsePassageIdxRef.current = next;
      return next;
    });
  }, []);
  const [refDirection, setRefDirection] = useState("down"); // "up" or "down" for swipe animation

  // Session
  const [sessionHistory, setSessionHistory] = useState([]);
  const [showSession, setShowSession] = useState(false);

  // Refs
  const inputRef = useRef(null);
  const textRef = useRef(null);
  const scrollRef = useRef(null);
  const tabPressedRef = useRef(false);
  const missedKeysRef = useRef({});
  const charStatesRef = useRef([]);
  const startTimeRef = useRef(null);
  const finishedRef = useRef(false);

  // Build flat text from word tokens
  const { flatText, passageMap } = useMemo(() => {
    const tokens = mode === "words" ? wordTokens.slice(0, wordCount) : wordTokens;
    const text = tokens.map((t) => t.word).join(" ");
    // Build per-character passage map
    const pMap = [];
    tokens.forEach((t, wi) => {
      const chars = t.word.split("");
      chars.forEach(() => pMap.push(t.passageIdx));
      if (wi < tokens.length - 1) pMap.push(t.passageIdx); // space belongs to current word's passage
    });
    return { flatText: text, passageMap: pMap };
  }, [wordTokens, mode, wordCount]);

  // Initialize on flatText change
  useEffect(() => {
    const states = flatText.split("").map((ch) => ({ char: ch, state: "untyped" }));
    setCharStates(states);
    charStatesRef.current = states;
    setCharPassageMap(passageMap);
    setCursorPos(0);
    setStarted(false);
    setFinished(false);
    finishedRef.current = false;
    setStartTime(null);
    startTimeRef.current = null;
    setEndTime(null);
    setLiveWpm(0);
    setElapsed(0);
    setWpmHistory([]);
    setMissedKeys({});
    missedKeysRef.current = {};
    totalCorrectRef.current = 0;
    totalIncorrectRef.current = 0;
    setActivePassageIdx(passageMap[0] ?? 0);
    setBrowsePassageIdx(null);
    setRefFadeKey((k) => k + 1);
    if (mode === "time") setTimeLeft(timeDuration);
  }, [flatText, passageMap, timeDuration, mode]);

  // Focus
  const focusInput = useCallback(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { focusInput(); }, [focusInput, finished]);

  // Scroll typing area to keep cursor visible
  useEffect(() => {
    if (!textRef.current || !scrollRef.current) return;
    const chars = textRef.current.children;
    if (chars[cursorPos]) {
      const charEl = chars[cursorPos];
      const container = scrollRef.current;
      const charTop = charEl.offsetTop;
      const lineHeight = charEl.offsetHeight;
      const targetScroll = charTop - lineHeight;
      container.scrollTop = Math.max(0, targetScroll);
    }
  }, [cursorPos]);

  // Update active passage based on cursor (clears browse override)
  useEffect(() => {
    if (charPassageMap[cursorPos] != null && charPassageMap[cursorPos] !== activePassageIdx) {
      setActivePassageIdx(charPassageMap[cursorPos]);
      setBrowsePassageIdx(null);
      setRefFadeKey((k) => k + 1);
    }
  }, [cursorPos, charPassageMap, activePassageIdx]);

  // Timer for time mode
  useEffect(() => {
    if (!started || finished || mode !== "time") return;
    const interval = setInterval(() => {
      const st = startTimeRef.current;
      if (!st) return;
      const elapsed = (Date.now() - st) / 1000;
      const remaining = Math.max(0, timeDuration - elapsed);
      setTimeLeft(Math.ceil(remaining));
      if (remaining <= 0) {
        clearInterval(interval);
        doFinish();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [started, finished, mode, timeDuration]);

  // Live WPM + elapsed timer
  useEffect(() => {
    if (!started || finished) return;
    const interval = setInterval(() => {
      const st = startTimeRef.current;
      if (!st) return;
      const elapsedMin = (Date.now() - st) / 60000;
      if (elapsedMin <= 0) return;
      setElapsed(Math.round((Date.now() - st) / 1000));
      const correct = totalCorrectRef.current;
      const wpm = Math.round(correct / 5 / elapsedMin);
      setLiveWpm(wpm);
      setWpmHistory((h) => [...h, wpm]);
    }, 1000);
    return () => clearInterval(interval);
  }, [started, finished]);

  // Word boundary for backspace
  const getWordBoundary = useCallback((pos) => {
    let ws = pos;
    while (ws > 0 && flatText[ws - 1] !== " ") ws--;
    return ws;
  }, [flatText]);

  const doFinish = useCallback(() => {
    if (finishedRef.current) return;
    const now = Date.now();
    finishedRef.current = true;
    setFinished(true);
    setEndTime(now);
    const st = startTimeRef.current;
    const elapsed = st ? (now - st) / 60000 : 0;
    // Use total keypress counts (includes corrected errors)
    const correct = totalCorrectRef.current;
    const incorrect = totalIncorrectRef.current;
    const wpm = elapsed > 0 ? Math.round(correct / 5 / elapsed) : 0;
    const rawWpm = elapsed > 0 ? Math.round((correct + incorrect) / 5 / elapsed) : 0;
    const accuracy = correct + incorrect > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 100;
    setSessionHistory((h) => [...h, {
      timestamp: now, wpm, rawWpm, accuracy, mode,
      duration: mode === "time" ? timeDuration : wordCount,
      missedKeys: { ...missedKeysRef.current },
    }]);
  }, [mode, timeDuration, wordCount]);

  // Restart
  const restartTest = useCallback((newWords = false, forceMode) => {
    const m = forceMode || mode;
    if (newWords || forceMode) {
      setWordTokens(m === "time" ? generateWordsForTimeMode() : generateWordsForWordMode(wordCount + 50));
    } else {
      setWordTokens((prev) => [...prev]);
    }
    setFinished(false);
    finishedRef.current = false;
    setStarted(false);
    setCursorPos(0);
    setStartTime(null);
    startTimeRef.current = null;
    setEndTime(null);
    setLiveWpm(0);
    setWpmHistory([]);
    setMissedKeys({});
    missedKeysRef.current = {};
    if (m === "time") setTimeLeft(timeDuration);
    setTimeout(focusInput, 50);
  }, [mode, wordCount, timeDuration, focusInput]);

  // Track Tab held state via keyup
  useEffect(() => {
    const onKeyUp = (e) => {
      if (e.key === "Tab") tabPressedRef.current = false;
    };
    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, []);

  // Keyboard handler
  const handleKeyDown = useCallback((e) => {
    // Tab
    if (e.key === "Tab") {
      e.preventDefault();
      tabPressedRef.current = true;
      return;
    }

    // Tab combos
    if (tabPressedRef.current) {
      if (e.key === "Enter") {
        e.preventDefault();
        // If browsing a different passage, jump to it
        if (browsePassageIdxRef.current != null) {
          // Jump to browsed passage — regenerate text starting from it
          e.preventDefault();
          const target = browsePassageIdxRef.current;
          setBrowsePassageIdx(null);
          // Regenerate tokens starting from the target passage
          // The init useEffect will handle all state reset via flatText change
          if (mode === "time") {
            setWordTokens(generateWordsForTimeMode(target));
          } else {
            const targetWords = [];
            const pWords = PASSAGES[target].text.split(/\s+/).filter(Boolean);
            pWords.forEach((w) => targetWords.push({ word: w, passageIdx: target }));
            let pool = shuffle(buildWordPool());
            let idx = 0;
            while (targetWords.length < wordCount + 50) {
              if (idx >= pool.length) { pool = shuffle(buildWordPool()); idx = 0; }
              targetWords.push(pool[idx++]);
            }
            setWordTokens(targetWords);
          }
          setTimeout(focusInput, 50);
          return;
        }
        restartTest(false);
        return;
      }
      if (e.key === "1") { e.preventDefault(); setMode("time"); restartTest(true, "time"); return; }
      if (e.key === "2") { e.preventDefault(); setMode("words"); restartTest(true, "words"); return; }
      if (e.key === "ArrowDown") {
        // Browse to next passage (no penalty) — keep tab held for continuous browsing
        e.preventDefault();
        setRefDirection("down");
        setBrowsePassageIdx((prev) => {
          const current = prev != null ? prev : activePassageIdx;
          const next = current + 1 >= PASSAGES.length ? 0 : current + 1;
          setRefFadeKey((k) => k + 1);
          return next;
        });
        return; // don't reset tabPressedRef
      }
      if (e.key === "ArrowUp") {
        // Browse to previous passage (no penalty)
        e.preventDefault();
        setRefDirection("up");
        setBrowsePassageIdx((prev) => {
          const current = prev != null ? prev : activePassageIdx;
          const next = current - 1 < 0 ? PASSAGES.length - 1 : current - 1;
          setRefFadeKey((k) => k + 1);
          return next;
        });
        return; // don't reset tabPressedRef
      }
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        setShowTimer((s) => !s);
        tabPressedRef.current = false;
        return;
      }
      tabPressedRef.current = false;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      if (showSession) { setShowSession(false); return; }
      restartTest(true);
      return;
    }

    if (e.ctrlKey && (e.key === "h" || e.key === "H")) {
      e.preventDefault();
      setShowSession((s) => !s);
      return;
    }

    if (finishedRef.current) return;

    if (e.ctrlKey && e.key === "v") { e.preventDefault(); return; }

    // Backspace
    if (e.key === "Backspace") {
      e.preventDefault();
      setCursorPos((prev) => {
        if (prev <= 0) return prev;
        const states = charStatesRef.current;
        // Find current word start
        let ws = prev;
        while (ws > 0 && flatText[ws - 1] !== " ") ws--;
        // At word start: allow backspacing over a mistyped space before this word
        if (prev === ws && prev > 0 && states[prev - 1].char === " " && states[prev - 1].state === "incorrect") {
          const newStates = [...states];
          newStates[prev - 1] = { ...newStates[prev - 1], state: "untyped" };
          charStatesRef.current = newStates;
          setCharStates(newStates);
          return prev - 1;
        }
        if (prev <= ws) return prev;
        const newStates = [...states];
        if (e.ctrlKey) {
          // Ctrl+Backspace: delete whole word back to word boundary
          for (let i = prev - 1; i >= ws; i--) {
            newStates[i] = { ...newStates[i], state: "untyped" };
          }
          charStatesRef.current = newStates;
          setCharStates(newStates);
          return ws;
        }
        newStates[prev - 1] = { ...newStates[prev - 1], state: "untyped" };
        charStatesRef.current = newStates;
        setCharStates(newStates);
        return prev - 1;
      });
      return;
    }

    // Printable
    if (e.key.length !== 1 || e.ctrlKey || e.altKey || e.metaKey) return;
    e.preventDefault();

    // Clear browse override when typing
    setBrowsePassageIdx(null);

    // Start on first keystroke
    if (!startTimeRef.current) {
      const now = Date.now();
      setStarted(true);
      setStartTime(now);
      startTimeRef.current = now;
    }

    setCursorPos((prev) => {
      if (prev >= flatText.length) return prev;
      const newStates = [...charStatesRef.current];
      const expected = flatText[prev];
      if (e.key === expected) {
        newStates[prev] = { ...newStates[prev], state: "correct" };
        totalCorrectRef.current++;
      } else {
        newStates[prev] = { ...newStates[prev], state: "incorrect" };
        totalIncorrectRef.current++;
        const k = expected.toLowerCase();
        missedKeysRef.current[k] = (missedKeysRef.current[k] || 0) + 1;
        setMissedKeys({ ...missedKeysRef.current });
      }
      charStatesRef.current = newStates;
      setCharStates(newStates);
      const newPos = prev + 1;
      // Auto-finish word mode
      if (mode === "words" && newPos >= flatText.length) {
        setTimeout(() => doFinish(), 30);
      }
      return newPos;
    });
  }, [flatText, mode, restartTest, doFinish, showSession]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Results computation
  const results = useMemo(() => {
    if (!finished || !startTime) return null;
    const end = endTime || Date.now();
    const elapsed = (end - startTime) / 60000;
    // Use total keypress counts (includes corrected errors)
    const correct = totalCorrectRef.current;
    const incorrect = totalIncorrectRef.current;
    const extra = 0;
    const wpm = elapsed > 0 ? Math.round(correct / 5 / elapsed) : 0;
    const rawWpm = elapsed > 0 ? Math.round((correct + incorrect) / 5 / elapsed) : 0;
    const accuracy = correct + incorrect > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 100;
    const seconds = Math.round((end - startTime) / 1000);
    return { wpm, rawWpm, accuracy, correct, incorrect, extra, seconds };
  }, [finished, startTime, endTime]);

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div style={{
      background: C.bg, color: C.text, fontFamily: "'JetBrains Mono', monospace",
      minHeight: "100vh", display: "flex", flexDirection: "column",
      position: "relative", cursor: "default", userSelect: "none",
    }} onClick={focusInput}>
      {/* Hidden input */}
      <input ref={inputRef} style={{ position: "absolute", opacity: 0, width: 0, height: 0, pointerEvents: "none" }}
        onPaste={(e) => e.preventDefault()} autoFocus />

      {/* Top bar */}
      <TopBar mode={mode} setMode={setMode} showAbout={showAbout} setShowAbout={setShowAbout}
        timeDuration={timeDuration} setTimeDuration={setTimeDuration}
        wordCount={wordCount} setWordCount={setWordCount}
        onRestart={restartTest} />

      {/* Main split layout */}
      <div style={{ display: "flex", flex: 1, position: "relative" }}>
        {/* Left/Center: typing area */}
        <div style={{ flex: "0 0 68%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", padding: "0 32px" }}>
          {showAbout ? (
            <AboutScreen />
          ) : <>
          {/* Live stats */}
          {started && !finished && showTimer && (
            <div style={{ position: "absolute", top: "12px", left: "32px", fontSize: "0.8rem", color: C.muted }}>
              <div style={{ color: C.amber, fontSize: "1.2rem" }}>{liveWpm} wpm</div>
              {mode === "time"
                ? <div style={{ fontSize: "1.5rem", color: C.active, marginTop: "4px" }}>{timeLeft}s</div>
                : <div style={{ marginTop: "4px" }}>{elapsed}s</div>
              }
            </div>
          )}

          {!finished ? (
            <div ref={scrollRef} style={{
              maxHeight: "8.4rem", overflow: "hidden", width: "100%", maxWidth: "640px",
              lineHeight: "2.8rem",
            }}>
              <div ref={textRef} style={{
                fontSize: "1.8rem", lineHeight: "2.8rem", position: "relative",
                whiteSpace: "pre-wrap", wordBreak: "break-word",
              }}>
                {(() => {
                  // Render a window of chars around cursor for performance
                  const WINDOW = 300;
                  const start = Math.max(0, cursorPos - WINDOW);
                  const end = Math.min(charStates.length, cursorPos + WINDOW);
                  const elements = [];
                  // Invisible placeholder for chars before window to preserve layout
                  if (start > 0) {
                    elements.push(
                      <span key="pre" style={{ color: "transparent", userSelect: "none" }}>
                        {flatText.slice(0, start)}
                      </span>
                    );
                  }
                  for (let i = start; i < end; i++) {
                    const ch = charStates[i];
                    const isCursor = i === cursorPos;
                    let color = C.text;
                    if (ch.state === "correct") color = C.correct;
                    else if (ch.state === "incorrect") color = C.incorrect;
                    else if (isCursor) color = C.active;
                    elements.push(
                      <span key={i} style={{
                        color, position: "relative",
                        backgroundColor: ch.state === "incorrect" ? "rgba(192,87,74,0.15)" : "transparent",
                      }}>
                        {isCursor && (
                          <span style={{
                            position: "absolute", left: "-1px", top: "4px",
                            width: "2px", height: "1.6rem", background: C.active,
                            animation: "blink 1.06s step-end infinite", zIndex: 2,
                            transition: "left 60ms ease",
                          }} />
                        )}
                        {ch.char}
                      </span>
                    );
                  }
                  return elements;
                })()}
              </div>
            </div>
          ) : (
            <ResultsScreen results={results} wpmHistory={wpmHistory} missedKeys={missedKeys}
              onRestartSame={() => restartTest(false)} onNewTest={() => restartTest(true)} />
          )}
          </>}
        </div>

        {/* Right: reference panel */}
        <div style={{
          flex: "0 0 30%", background: C.faint, display: "flex",
          alignItems: "center", justifyContent: "center", minHeight: 0, overflow: "auto",
        }}>
          {!showSession ? (
            <div style={{ width: "100%" }}>
              {browsePassageIdx != null && (
                <div style={{
                  textAlign: "center", fontSize: "0.6rem", color: C.muted,
                  padding: "12px 0 0", fontFamily: "'JetBrains Mono', monospace",
                }}>
                  browsing {browsePassageIdx + 1}/{PASSAGES.length} — Enter to jump · type to return
                </div>
              )}
              <ReferencePanel passageIdx={browsePassageIdx != null ? browsePassageIdx : activePassageIdx} fadeKey={refFadeKey} direction={refDirection} />
            </div>
          ) : null}
        </div>
      </div>

      {/* Shortcut bar */}
      <ShortcutBar />

      {/* Session panel overlay */}
      {showSession && (
        <SessionPanel sessionHistory={sessionHistory} onClose={() => setShowSession(false)} />
      )}
    </div>
  );
}
