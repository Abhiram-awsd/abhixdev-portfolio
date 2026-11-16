import { Component, useState } from 'react';

import Aurora from './bits/Aurora/Aurora.jsx';
import Threads from './bits/Threads/Threads.jsx';
import DotGrid from './bits/DotGrid/DotGrid.jsx';
import Particles from './bits/Particles/Particles.jsx';

import SplitText from './bits/SplitText/SplitText.jsx';
import BlurText from './bits/BlurText/BlurText.jsx';
import ShinyText from './bits/ShinyText/ShinyText.jsx';
import GradientText from './bits/GradientText/GradientText.jsx';
import RotatingText from './bits/RotatingText/RotatingText.jsx';
import DecryptedText from './bits/DecryptedText/DecryptedText.jsx';
import CountUp from './bits/CountUp/CountUp.jsx';
import ScrollReveal from './bits/ScrollReveal/ScrollReveal.jsx';
import ScrollVelocity from './bits/ScrollVelocity/ScrollVelocity.jsx';
import TextPressure from './bits/TextPressure/TextPressure.jsx';
import CurvedLoop from './bits/CurvedLoop/CurvedLoop.jsx';
import TrueFocus from './bits/TrueFocus/TrueFocus.jsx';
import CircularText from './bits/CircularText/CircularText.jsx';
import TextType from './bits/TextType/TextType.jsx';

import ClickSpark from './bits/ClickSpark/ClickSpark.jsx';
import Magnet from './bits/Magnet/Magnet.jsx';
import StarBorder from './bits/StarBorder/StarBorder.jsx';
import GradualBlur from './bits/GradualBlur/GradualBlur.jsx';
import FadeContent from './bits/FadeContent/FadeContent.jsx';
import Noise from './bits/Noise/Noise.jsx';
import MetaBalls from './bits/MetaBalls/MetaBalls.jsx';

import SpotlightCard from './bits/SpotlightCard/SpotlightCard.jsx';
import ScrollStack, { ScrollStackItem } from './bits/ScrollStack/ScrollStack.jsx';
import Dock from './bits/Dock/Dock.jsx';
import SpecularButton from './bits/SpecularButton/SpecularButton.jsx';
import CardSwap, { Card } from './bits/CardSwap/CardSwap.jsx';
import Counter from './bits/Counter/Counter.jsx';
import Folder from './bits/Folder/Folder.jsx';

import HoldButton from './bits/HoldButton/HoldButton.jsx';
import SquishSwitch from './bits/SquishSwitch/SquishSwitch.jsx';
import PulseHeart from './bits/PulseHeart/PulseHeart.jsx';
import SpringCheck from './bits/SpringCheck/SpringCheck.jsx';
import JellyRadio from './bits/JellyRadio/JellyRadio.jsx';
import WakeSlider from './bits/WakeSlider/WakeSlider.jsx';
import LatticeLoader from './bits/LatticeLoader/LatticeLoader.jsx';
import StatusMark from './bits/StatusMark/StatusMark.jsx';

const AMBER = '#ffb347';
const CORAL = '#ff5e62';
const ORCHID = '#c644fc';

/* One component failing must never blank the page. */
class Safe extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error) {
    console.error('BIT FAILED:', this.props.name, error);
  }
  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}

const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const DOCK = [
  { label: 'Top', icon: <Icon d="M3 11l9-8 9 8M5 10v10h14V10" />, onClick: () => go('top') },
  { label: 'Craft', icon: <Icon d="M12 3l2.6 5.6L21 9.3l-4.6 4.3 1.2 6.4L12 16.9 6.4 20l1.2-6.4L3 9.3l6.4-.7z" />, onClick: () => go('craft') },
  { label: 'Process', icon: <Icon d="M4 6h16M4 12h10M4 18h13" />, onClick: () => go('process') },
  { label: 'Work', icon: <Icon d="M3 7h18v13H3zM8 7V4h8v3" />, onClick: () => go('work') },
  { label: 'Play', icon: <Icon d="M7 4l13 8-13 8z" />, onClick: () => go('play') },
  { label: 'Contact', icon: <Icon d="M3 6h18v12H3zM3 7l9 7 9-7" />, onClick: () => go('contact') }
];

const CRAFT = [
  ['Product design', 'Flows, screens and systems for web and mobile products, from first sketch to shipped build.', ['Web', 'Mobile'], 'M4 5h16v11H4zM9 20h6M12 16v4'],
  ['Brand systems', 'Identity that survives contact with real interfaces: type, colour, voice and motion rules.', ['Identity', 'Guidelines'], 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5'],
  ['Motion design', 'Transitions with a purpose and a budget. Springs where things are held, curves where they are sent.', ['Interaction', 'Prototypes'], 'M3 17c4 0 4-10 9-10s5 10 9 10'],
  ['Creative code', 'Shaders, canvas and generative systems for when a static picture is not enough.', ['Canvas', 'Shaders'], 'M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16'],
  ['Design systems', 'Tokens, components and documentation that engineers actually want to use.', ['Tokens', 'Components'], 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z'],
  ['3D and WebGL', 'Real depth in the browser, tuned to stay smooth on a mid-range laptop.', ['Three.js', 'Performance'], 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5']
];

const STEPS = [
  ['01', 'Listen', 'A week of questions before a single pixel. We learn the product, the people using it and what a good day looks like for them.'],
  ['02', 'Shape', 'Flows, structure and the first visual direction, tested in rough prototypes you can click through on day ten.'],
  ['03', 'Animate', 'Motion gets designed with the interface, not sprinkled on after. Every transition has a job and a duration budget.'],
  ['04', 'Ship', 'We build it ourselves in production code, so what was designed is what goes live.']
];

const WORK = [
  ['Aster', 'Banking app', `linear-gradient(135deg, ${ORCHID}, #4b1d8f)`],
  ['Fieldnotes', 'Journaling tool', `linear-gradient(135deg, ${AMBER}, ${CORAL})`],
  ['Tidal', 'Music player', `linear-gradient(135deg, ${AMBER}, ${ORCHID})`],
  ['Orbit', 'Analytics suite', `linear-gradient(135deg, ${CORAL}, #7a1f4f)`]
];

function CraftCard({ n, title, text, tags, icon }) {
  return (
    <SpotlightCard className="cap-card" spotlightColor="rgba(255,179,71,.28)" spotlightSize={320}>
      <div className="cap">
        <div className="cap-top">
          <span className="cap-icon">
            <Icon d={icon} />
          </span>
          <span className="cap-n">{n}</span>
        </div>
        <h3>{title}</h3>
        <p>{text}</p>
        <ul className="cap-tags">
          {tags.map(t => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </SpotlightCard>
  );
}

function Tile({ name, children, wide }) {
  return (
    <div className={`tile${wide ? ' tile-wide' : ''}`}>
      <div className="tile-stage">
        <Safe name={name}>{children}</Safe>
      </div>
      <span className="tile-name">{name}</span>
    </div>
  );
}

export default function App() {
  const [clicks, setClicks] = useState(0);
  const [status, setStatus] = useState('running');
  const nextStatus = () => setStatus(s => (s === 'running' ? 'done' : s === 'done' ? 'failed' : 'running'));

  return (
    <ClickSpark sparkColor={AMBER} sparkSize={12} sparkRadius={26} sparkCount={10} duration={480}>
      <div className="page" id="top" onPointerDown={() => setClicks(c => c + 1)}>
        <Safe name="Noise">
          <Noise opacity={0.07} fixed zIndex={50} />
        </Safe>

        {/* ---------- hero ---------- */}
        <header className="hero">
          <div className="fill">
            <Safe name="Aurora">
              <Aurora colorStops={[ORCHID, CORAL, AMBER]} amplitude={1.15} blend={0.6} height={0.62} glow={0.8} />
            </Safe>
          </div>
          <nav className="topbar">
            <span className="brand">lumen</span>
            <span className="topbar-note">Concept studio site</span>
          </nav>
          <div className="hero-in">
            <div className="chip">
              <ShinyText text="Booking projects for 2027" speed={3} color="#c9c1d6" shineColor="#ffffff" />
            </div>
            <Safe name="SplitText" fallback={<h1 className="h1">Interfaces that</h1>}>
              <SplitText tag="h1" text="Interfaces that" className="h1" delay={40} duration={1.1} splitType="chars" textAlign="center" rootMargin="0px" />
            </Safe>
            <div className="h1 h1-b">
              <span>feel</span>
              <Safe name="RotatingText" fallback={<span className="rot">alive.</span>}>
                <RotatingText texts={['alive.', 'effortless.', 'inevitable.', 'human.']} mainClassName="rot" rotationInterval={2600} staggerDuration={0.025} staggerFrom="last" />
              </Safe>
            </div>
            <Safe name="BlurText">
              <BlurText
                text="We are a small studio that designs and builds products where motion carries meaning. Every hover, scroll and click on this page is live."
                className="lede"
                delay={35}
                animateBy="words"
                direction="bottom"
              />
            </Safe>
            <div className="cta">
              <Safe name="Magnet">
                <Magnet padding={70} magnetStrength={3}>
                  <StarBorder as="button" color={AMBER} duration={5} radius={99} onClick={() => go('contact')} className="star-cta">
                    Start a project
                  </StarBorder>
                </Magnet>
              </Safe>
              <Safe name="SpecularButton">
                <SpecularButton size="lg" radius={99} onClick={() => go('work')}>
                  See the work
                </SpecularButton>
              </Safe>
            </div>
          </div>
          <div className="hero-badge">
            <Safe name="CircularText">
              <CircularText text="SCROLL ✦ EXPLORE ✦ PLAY ✦ " size={128} fontSize={12} fontWeight={600} spinDuration={18} />
            </Safe>
          </div>
        </header>

        <Safe name="ScrollVelocity">
          <ScrollVelocity texts={['Motion with meaning ✦', 'Design you can feel ✦']} velocity={55} className="vel" numCopies={6} />
        </Safe>

        {/* ---------- manifesto ---------- */}
        <section className="wrap manifesto">
          <p className="eyebrow">Manifesto</p>
          <Safe name="ScrollReveal" fallback={<p className="mani">Good interfaces are felt before they are understood.</p>}>
            <ScrollReveal baseOpacity={0.12} enableBlur blurStrength={6} baseRotation={2} textClassName="mani">
              Good interfaces are felt before they are understood. We sweat the half second between a click and its answer, because that is where trust gets built.
            </ScrollReveal>
          </Safe>
        </section>

        {/* ---------- craft ---------- */}
        <section className="wrap" id="craft">
          <FadeContent blur duration={0.9}>
            <p className="eyebrow">Craft</p>
            <h2>
              Six disciplines, <GradientText colors={[AMBER, CORAL, AMBER]} animationSpeed={6} className="gt">one team</GradientText>
            </h2>
            <p className="sub">Design, motion and code sit at the same table, so nothing gets lost between them.</p>
          </FadeContent>
          <div className="caps">
            {CRAFT.map(([title, text, tags, icon], i) => (
              <Safe name="SpotlightCard" key={title}>
                <CraftCard n={`0${i + 1}`} title={title} text={text} tags={tags} icon={icon} />
              </Safe>
            ))}
          </div>
        </section>

        {/* ---------- numbers ---------- */}
        <section className="numbers">
          <div className="fill">
            <Safe name="Particles">
              <Particles particleCount={260} particleColors={[AMBER, CORAL, '#ffffff']} speed={0.06} particleBaseSize={80} alphaParticles moveParticlesOnHover />
            </Safe>
          </div>
          <div className="wrap stats">
            <div>
              <b>
                <Safe name="CountUp" fallback="40">
                  <CountUp to={40} duration={2} />
                </Safe>
              </b>
              <span>live components on this page</span>
            </div>
            <div>
              <b>
                <Safe name="CountUp" fallback="5">
                  <CountUp to={5} duration={2} />
                </Safe>
              </b>
              <span>WebGL and canvas scenes</span>
            </div>
            <div>
              <b>
                <Safe name="CountUp" fallback="0">
                  <CountUp to={0} from={24} duration={2} />
                </Safe>
              </b>
              <span>image files used</span>
            </div>
            <div>
              <b className="odo">
                <Safe name="Counter" fallback={clicks}>
                  <Counter value={clicks} fontSize={64} fontWeight={700} />
                </Safe>
              </b>
              <span>clicks you have made here</span>
            </div>
          </div>
        </section>

        {/* ---------- process ---------- */}
        <section className="process" id="process">
          <div className="fill dots">
            <Safe name="DotGrid">
              <DotGrid dotSize={4} gap={26} baseColor="#2a2031" activeColor={AMBER} proximity={150} />
            </Safe>
          </div>
          <div className="wrap rel">
            <FadeContent blur duration={0.9}>
              <p className="eyebrow">Process</p>
              <h2>Four steps, stacked</h2>
              <p className="sub">Keep scrolling. Each step slides over the last.</p>
            </FadeContent>
            <Safe name="ScrollStack">
              <ScrollStack useWindowScroll smoothScroll={false} itemDistance={70} itemStackDistance={22} stackPosition="18%" itemScale={0.035} baseScale={0.88} dimAmount={0.35} blurAmount={1.5} className="steps">
                {STEPS.map(([n, t, d]) => (
                  <ScrollStackItem key={n} itemClassName="step">
                    <div className="step-in">
                      <span className="step-n">{n}</span>
                      <h3>{t}</h3>
                      <p>{d}</p>
                    </div>
                  </ScrollStackItem>
                ))}
              </ScrollStack>
            </Safe>
          </div>
        </section>

        {/* ---------- work ---------- */}
        <section className="wrap work" id="work">
          <div className="work-copy">
            <p className="eyebrow">Work</p>
            <Safe name="TrueFocus" fallback={<h2>Selected work</h2>}>
              <TrueFocus sentence="Selected work" blurAmount={4} borderColor={AMBER} glowColor="rgba(255,179,71,.5)" animationDuration={0.6} pauseBetweenAnimations={1.2} />
            </Safe>
            <p className="sub">
              <Safe name="DecryptedText" fallback="Four products, four different personalities.">
                <DecryptedText text="Four products, four different personalities." animateOn="view" sequential speed={28} revealDirection="start" />
              </Safe>
            </p>
            <p className="sub small">Drag the cards, or let them shuffle. The folder opens too.</p>
            <div className="folder">
              <Safe name="Folder">
                <Folder color={CORAL} label="Case studies" items={[{ title: 'Research' }, { title: 'Motion spec' }, { title: 'Tokens' }]} size={1.1} />
              </Safe>
            </div>
          </div>
          <div className="swap">
            <Safe name="CardSwap">
              <CardSwap width={420} height={300} cardDistance={48} verticalDistance={56} delay={3200} skewAmount={5} cardRadius={22}>
                {WORK.map(([name, kind, bg]) => (
                  <Card key={name}>
                    <div className="work-card" style={{ background: bg }}>
                      <span>{kind}</span>
                      <strong>{name}</strong>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </Safe>
          </div>
        </section>

        {/* ---------- play ---------- */}
        <section className="wrap" id="play">
          <FadeContent blur duration={0.9}>
            <p className="eyebrow">Playground</p>
            <h2>Small things, done properly</h2>
            <p className="sub">Micro-interactions are where a product earns its feel. Try all of them.</p>
          </FadeContent>
          <div className="tiles">
            <Tile name="Hold Button">
              <HoldButton fillColor={CORAL} holdTime={1400} doneLabel="Sent">
                Hold to send
              </HoldButton>
            </Tile>
            <Tile name="Squish Switch">
              <SquishSwitch defaultChecked trackOnColor={AMBER} ariaLabel="Demo switch" />
            </Tile>
            <Tile name="Pulse Heart">
              <PulseHeart count={128} likedColor={CORAL} />
            </Tile>
            <Tile name="Spring Check">
              <SpringCheck label="Ship the build" color="#f5f0fa" fillColor={AMBER} />
            </Tile>
            <Tile name="Jelly Radio" wide>
              <JellyRadio items={['Calm', 'Snappy', 'Bouncy', 'Wild']} defaultValue="Snappy" activeColor={AMBER} ariaLabel="Motion personality" />
            </Tile>
            <Tile name="Wake Slider" wide>
              <div className="slider">
                <WakeSlider defaultValue={62} fillColor={AMBER} crestColor={CORAL} ariaLabel="Demo slider" />
              </div>
            </Tile>
            <Tile name="Lattice Loader">
              <LatticeLoader label="Rendering" color={AMBER} glow />
            </Tile>
            <Tile name="Status Mark">
              <button className="ghost" type="button" onClick={nextStatus}>
                <StatusMark status={status} label={status === 'running' ? 'Deploying' : status === 'done' ? 'Deployed' : 'Failed'} color="#f5f0fa" size={22} fontSize={16} />
              </button>
            </Tile>
            <Tile name="Meta Balls" wide>
              <div className="fill">
                <MetaBalls color={AMBER} cursorBallColor={CORAL} ballCount={12} animationSize={26} enableTransparency speed={0.35} />
              </div>
            </Tile>
            <Tile name="Text Type" wide>
              <TextType text={['Feels fast.', 'Feels right.', 'Feels like yours.']} typingSpeed={55} pauseDuration={1400} className="typed" cursorCharacter="_" />
            </Tile>
          </div>
        </section>

        {/* ---------- contact ---------- */}
        <section className="contact" id="contact">
          <div className="fill">
            <Safe name="Threads">
              <Threads color={[1, 0.62, 0.3]} amplitude={1.5} distance={0.35} lineCount={70} enableMouseInteraction />
            </Safe>
          </div>
          <div className="wrap rel contact-in">
            <p className="eyebrow">Contact</p>
            <div className="pressure">
              <Safe name="TextPressure" fallback={<h2 className="big">LET'S TALK</h2>}>
                <TextPressure text="LET'S TALK" textColor="#fff7ee" pressureColor={AMBER} minFontSize={44} flex width weight italic={false} />
              </Safe>
            </div>
            <p className="sub center">Tell us what you are building. This is a concept site, so the button takes you back to the designer.</p>
            <div className="cta">
              <Magnet padding={60} magnetStrength={3}>
                <StarBorder as="a" href="../../#contact" color={CORAL} duration={4} radius={99} className="star-cta">
                  Work with Abhiram
                </StarBorder>
              </Magnet>
            </div>
          </div>
          <div className="curve">
            <Safe name="CurvedLoop">
              <CurvedLoop marqueeText="Available for new projects ✦ Design ✦ Motion ✦ Code ✦ " speed={1.4} curveAmount={220} fontSize={64} color="#f5f0fa" />
            </Safe>
          </div>
        </section>

        <footer className="foot wrap">
          <span>Concept project. Lumen Studio is not a real company.</span>
          <span>
            Designed and built by <a href="../../">Abhiram Appani</a> with <a href="https://reactbits.dev">React Bits</a> components.
          </span>
        </footer>

        <Safe name="GradualBlur">
          <GradualBlur target="page" position="bottom" height="5.5rem" strength={2} layers={6} zIndex={40} />
        </Safe>
        <Safe name="Dock">
          <Dock items={DOCK} position="bottom" baseItemSize={42} magnification={62} panelHeight={58} accentColor={AMBER} showIndicators={false} showBadges={false} className="dock" />
        </Safe>
      </div>
    </ClickSpark>
  );
}
