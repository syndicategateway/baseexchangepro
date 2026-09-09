import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as ArrowUpRight, c as Menu, d as Landmark, f as Headset, g as Building2, h as Cpu, i as UserPlus, l as LogOut, m as Earth, n as X, o as TrendingUp, p as Flame, r as Wallet, s as ShieldCheck, t as Zap, u as Lock, v as ArrowRight, y as Activity } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay, i as DialogDescription, l as Slot, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-1KdGVX7A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatUsd(value, digits = 2) {
	return value.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:ring-2 focus-visible:ring-fire-orange/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep active:not-disabled:scale-[0.96] transition-[scale,background-color,color,box-shadow,border-color,opacity] duration-150 ease-out", {
	variants: {
		variant: {
			default: "bg-fire-red text-text-light hover:bg-fire-orange glow-ember",
			gold: "bg-fire-gold text-bg-deep hover:bg-fire-gold/90 glow-gold",
			outline: "border border-fire-red/45 bg-transparent text-text-light hover:border-fire-orange hover:bg-fire-red/12",
			ghost: "bg-transparent text-text-light hover:bg-text-light/6"
		},
		size: {
			default: "h-11 rounded-md px-5",
			sm: "h-9 rounded-md px-3 text-xs",
			lg: "h-12 rounded-lg px-7 text-base",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var COLORS = [
	"#ff3d00",
	"#ffb300",
	"#d32f2f",
	"#ff6d00",
	"#ff8a3d"
];
function EmberCanvas() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;
		let raf = 0;
		let running = true;
		const embers = [];
		const countForWidth = (w) => {
			if (w < 480) return 36;
			if (w < 768) return 56;
			return 92;
		};
		const spawn = (w, h, fromTop = false) => ({
			x: Math.random() * w,
			y: fromTop ? Math.random() * h : h + Math.random() * 40,
			vx: (Math.random() - .5) * .35,
			vy: -(.35 + Math.random() * .85),
			size: .6 + Math.random() * 2.1,
			alpha: .18 + Math.random() * .55,
			decay: .0012 + Math.random() * .0024,
			hue: Math.floor(Math.random() * COLORS.length)
		});
		const resize = () => {
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			const w = window.innerWidth;
			const h = window.innerHeight;
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const target = countForWidth(w);
			if (embers.length === 0) for (let i = 0; i < target; i++) embers.push(spawn(w, h, true));
			else if (embers.length < target) while (embers.length < target) embers.push(spawn(w, h, true));
			else embers.length = target;
		};
		const tick = () => {
			if (!running) return;
			const w = window.innerWidth;
			const h = window.innerHeight;
			ctx.clearRect(0, 0, w, h);
			for (let i = 0; i < embers.length; i++) {
				const p = embers[i];
				p.x += p.vx + Math.sin(p.y * .012) * .12;
				p.y += p.vy;
				p.alpha -= p.decay;
				if (p.y < -10 || p.alpha <= 0) {
					embers[i] = spawn(w, h, false);
					continue;
				}
				ctx.globalAlpha = p.alpha;
				ctx.fillStyle = COLORS[p.hue];
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fill();
				if (p.size > 1.4) {
					ctx.globalAlpha = p.alpha * .22;
					ctx.beginPath();
					ctx.arc(p.x, p.y, p.size * 3.2, 0, Math.PI * 2);
					ctx.fill();
				}
			}
			ctx.globalAlpha = 1;
			raf = requestAnimationFrame(tick);
		};
		const onVisibility = () => {
			if (document.hidden) {
				running = false;
				cancelAnimationFrame(raf);
			} else if (!running) {
				running = true;
				raf = requestAnimationFrame(tick);
			}
		};
		resize();
		raf = requestAnimationFrame(tick);
		window.addEventListener("resize", resize);
		document.addEventListener("visibilitychange", onVisibility);
		return () => {
			running = false;
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "ember-canvas",
		"aria-hidden": "true"
	});
}
function Reveal({ children, className, delay = 0, as: Tag = "div" }) {
	const ref = (0, import_react.useRef)(null);
	const [shown, setShown] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setShown(true);
			return;
		}
		const io = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setShown(true);
				io.disconnect();
			}
		}, {
			threshold: .14,
			rootMargin: "0px 0px -8% 0px"
		});
		io.observe(el);
		return () => io.disconnect();
	}, []);
	const style = { transitionDelay: `${delay}ms` };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		className: cn("reveal", shown && "reveal-in", className),
		style,
		children
	});
}
function AccessModal({ open, onOpenChange, mode, onModeChange, onAuthenticated }) {
	const titleId = (0, import_react.useId)();
	const [email, setEmail] = (0, import_react.useState)("");
	const [secret, setSecret] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [applied, setApplied] = (0, import_react.useState)(false);
	const firstField = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (open) {
			setError("");
			setApplied(false);
			const t = window.setTimeout(() => firstField.current?.focus(), 40);
			return () => window.clearTimeout(t);
		}
	}, [open, mode]);
	function handleLogin(e) {
		e.preventDefault();
		if (!email.trim() || !secret.trim()) {
			setError("Enter both operator email and access key.");
			return;
		}
		const session = {
			email: email.trim(),
			name: email.trim().split("@")[0] || "Operator"
		};
		try {
			localStorage.setItem("bep.session", JSON.stringify(session));
		} catch {}
		onAuthenticated(session);
		onOpenChange(false);
	}
	function handleApply(e) {
		e.preventDefault();
		if (!name.trim() || !email.trim()) {
			setError("Name and email are required.");
			return;
		}
		setApplied(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "modal-scrim z-modal-scrim fixed inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"aria-labelledby": titleId,
			className: "panel z-modal fixed top-1/2 left-1/2 w-[min(92vw,440px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 md:p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow mb-2",
							children: "Base Exchange Pro"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							id: titleId,
							className: "font-display text-2xl font-semibold",
							children: mode === "login" ? "Desk login" : "Open an operator seat"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "mt-2 text-sm text-text-muted",
							children: mode === "login" ? "Demonstration desk — any credentials open a local session." : "Tell the desk who you are. This is a simulated application."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Close",
							className: "shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 grid grid-cols-2 gap-1 rounded-lg bg-bg-deep p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("h-10 rounded-md text-sm font-medium transition-[background-color,color] duration-150", mode === "login" ? "bg-fire-red text-text-light" : "text-text-muted hover:text-text-light"),
						onClick: () => onModeChange("login"),
						children: "Dashboard login"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("h-10 rounded-md text-sm font-medium transition-[background-color,color] duration-150", mode === "apply" ? "bg-fire-red text-text-light" : "text-text-muted hover:text-text-light"),
						onClick: () => onModeChange("apply"),
						children: "Start earning"
					})]
				}),
				mode === "login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleLogin,
					className: "flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-text-muted",
								children: "Operator email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: firstField,
								className: "field",
								type: "email",
								autoComplete: "username",
								placeholder: "you@desk.io",
								value: email,
								onChange: (e) => setEmail(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-text-muted",
								children: "Access key"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								type: "password",
								autoComplete: "current-password",
								placeholder: "••••••••",
								value: secret,
								onChange: (e) => setSecret(e.target.value)
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fire-orange",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							size: "lg",
							className: "mt-1 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {}), "Enter operator desk"]
						})
					]
				}) : applied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-bg-deep p-5 text-sm leading-relaxed text-text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg text-fire-gold",
							children: "Application received."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2",
							children: [
								"A dedicated manager will review the seat request for",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-light",
									children: email
								}),
								". This is a demonstration — no funds are collected."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-5 w-full",
							onClick: () => onOpenChange(false),
							children: "Return to site"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleApply,
					className: "flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-text-muted",
								children: "Full name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: firstField,
								className: "field",
								type: "text",
								autoComplete: "name",
								placeholder: "Alex Rivera",
								value: name,
								onChange: (e) => setName(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-text-muted",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								type: "email",
								autoComplete: "email",
								placeholder: "you@desk.io",
								value: email,
								onChange: (e) => setEmail(e.target.value)
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fire-orange",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "lg",
							variant: "gold",
							className: "mt-1 w-full",
							children: "Submit application"
						})
					]
				})
			]
		})] })
	});
}
var HEADLINE = "Forge Your Future with Base Exchange Pro";
var HIGHLIGHT = "Base Exchange Pro";
var DAILY_RATE = .0075;
var TICKER = [
	"USDT vault credited · 12,400",
	"Rail DBS-SG settled",
	"Operator desk online · 99.98%",
	"EUR rail Revolut live",
	"Yield epoch closed +0.75%",
	"Compliance ledger synced"
];
var STEPS = [
	{
		n: "01",
		title: "Register in System",
		body: "Create an operator profile. Identity is verified once, then the desk is yours.",
		icon: UserPlus
	},
	{
		n: "02",
		title: "Top Up Balance (USDT)",
		body: "Fund the operational vault in USDT. Capital is ring-fenced per seat.",
		icon: Wallet
	},
	{
		n: "03",
		title: "Add Bank Accounts",
		body: "Connect settlement rails. Multi-jurisdiction banks, one routing table.",
		icon: Landmark
	},
	{
		n: "04",
		title: "Start Operating & Yielding",
		body: "Flows run on the engine. You supervise; the desk compounds the rest.",
		icon: Zap
	}
];
var BENEFITS = [
	{
		title: "Global bank support",
		body: "Coverage across major corridors — USD, EUR, GBP and regional rails — with live status on every account.",
		icon: Earth
	},
	{
		title: "Dedicated manager guidance",
		body: "A named desk manager walks the first thirty days: rails, limits, and operating cadence.",
		icon: Headset
	},
	{
		title: "Automated system",
		body: "Routing, reconciliation and yield posting run without night shifts. Exceptions surface, not noise.",
		icon: Cpu
	},
	{
		title: "7+ years operating",
		body: "The same core ledger since 2018. No reboot, no “new protocol,” no vanishing team.",
		icon: ShieldCheck
	}
];
var FEATURES = [
	{
		title: "Instant USDT settlement",
		body: "Vault credits land as soon as the chain confirms. No batch windows, no “next business day.”",
		span: "md:col-span-4",
		icon: Zap
	},
	{
		title: "Encrypted operational vault",
		body: "Keys never sit on the operator laptop. Withdrawals require dual control.",
		span: "md:col-span-2",
		icon: Lock
	},
	{
		title: "Multi-rail routing",
		body: "The engine picks the cheapest live rail per corridor. Failed legs retry automatically.",
		span: "md:col-span-2",
		icon: Building2
	},
	{
		title: "Compliance-ready ledgers",
		body: "Every flow is timestamped, hashed and exportable. Auditors get a file, not a story.",
		span: "md:col-span-2",
		icon: ShieldCheck
	},
	{
		title: "24/7 liquidity desk",
		body: "Human coverage when the engine raises a hand. Not a chatbot. Not a ticket queue.",
		span: "md:col-span-2",
		icon: Headset
	}
];
var BAR_WEIGHTS = [
	.82,
	.94,
	1.08,
	.88,
	1.14,
	.97,
	1.06
];
function LandingPage({ loginOpen, onLoginOpenChange, accessMode, onAccessModeChange, onAuthenticated }) {
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	function openApply() {
		onAccessModeChange("apply");
		onLoginOpenChange(true);
	}
	function openLogin() {
		onAccessModeChange("login");
		onLoginOpenChange(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmberCanvas, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grain",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {
				menuOpen,
				onMenuOpen: setMenuOpen,
				onLogin: openLogin
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { onApply: openApply }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Features, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Benefits, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, { onApply: openApply }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessModal, {
				open: loginOpen,
				onOpenChange: onLoginOpenChange,
				mode: accessMode,
				onModeChange: onAccessModeChange,
				onAuthenticated
			})
		]
	});
}
function Navbar({ menuOpen, onMenuOpen, onLogin }) {
	const [solid, setSolid] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setSolid(window.scrollY > 18);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);
	const links = [
		{
			href: "#how-it-works",
			label: "How It Works"
		},
		{
			href: "#benefits",
			label: "Benefits"
		},
		{
			href: "#features",
			label: "Features"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-200", solid ? "nav-solid" : "nav-clear"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-[4.25rem] md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#top",
					className: "flex items-center gap-2.5",
					"aria-label": "Base Exchange Pro home",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-9 items-center justify-center rounded-md bg-bg-surface glow-ember",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4 text-fire-orange" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "logo-type font-display text-[0.95rem] font-semibold tracking-wide md:text-base",
						children: "Base Exchange Pro"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-8 text-sm text-text-muted md:flex",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.href,
						className: "transition-[color] duration-150 hover:text-text-light",
						children: l.label
					}, l.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: onLogin,
						className: "hidden md:inline-flex",
						children: "Dashboard Login"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "md:hidden",
						"aria-label": menuOpen ? "Close menu" : "Open menu",
						"aria-expanded": menuOpen,
						onClick: () => onMenuOpen(!menuOpen),
						children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					})]
				})
			]
		}), menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-fire-red/40 bg-bg-deep/95 px-4 py-6 backdrop-blur-xl md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-col gap-1",
				children: [links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: l.href,
					className: "flex h-12 items-center text-base",
					onClick: () => onMenuOpen(false),
					children: l.label
				}, l.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3 w-full",
					onClick: () => {
						onMenuOpen(false);
						onLogin();
					},
					children: "Dashboard Login"
				})]
			})
		}) : null]
	});
}
function Hero({ onApply }) {
	const sectionRef = (0, import_react.useRef)(null);
	const [typed, setTyped] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setTyped(HEADLINE);
			setDone(true);
			return;
		}
		let i = 0;
		const id = window.setInterval(() => {
			i += 1;
			setTyped(HEADLINE.slice(0, i));
			if (i >= 40) {
				window.clearInterval(id);
				setDone(true);
			}
		}, 36);
		return () => window.clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => {
		const el = sectionRef.current;
		if (!el) return;
		if (window.matchMedia("(pointer: coarse)").matches) return;
		const onMove = (e) => {
			const r = el.getBoundingClientRect();
			el.style.setProperty("--mx", `${e.clientX - r.left}px`);
			el.style.setProperty("--my", `${e.clientY - r.top}px`);
		};
		el.addEventListener("pointermove", onMove);
		return () => el.removeEventListener("pointermove", onMove);
	}, []);
	const hi = typed.indexOf(HIGHLIGHT);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref: sectionRef,
		id: "top",
		className: "relative min-h-dvh overflow-hidden pt-24 pb-16 md:pt-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-light pointer-events-none absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-vignette pointer-events-none absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex max-w-6xl flex-col items-center px-4 text-center md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Operator infrastructure"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "hero-title mt-5 min-h-[4.6em] max-w-4xl md:min-h-[2.6em]",
						children: hi === -1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [typed, !done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "caret",
							"aria-hidden": "true"
						}) : null] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							typed.slice(0, hi),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fire",
								children: typed.slice(hi)
							}),
							!done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "caret",
								"aria-hidden": "true"
							}) : null
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg",
						children: "Stable income and flexible remote work. We provide the infrastructure for automating and optimizing digital resource flows."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col items-center gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "lg",
							onClick: onApply,
							className: "min-w-52 pl-6 pr-5",
							children: ["Start Earning Today", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							variant: "outline",
							asChild: true,
							className: "min-w-52",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#calculator",
								children: ["Model your yield", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-14 grid w-full max-w-3xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
								value: "7+",
								label: "Years live"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
								value: "40+",
								label: "Bank corridors"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
								value: "99.98%",
								label: "Desk uptime"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStat, {
								value: "24/7",
								label: "Human coverage"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ticker relative mt-16 overflow-hidden border-y border-text-light/8 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ticker-track gap-10 px-6 text-xs tracking-[0.18em] text-text-muted uppercase",
					children: [...TICKER, ...TICKER].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "live-dot size-1.5 rounded-full bg-fire-orange" }), item]
					}, `${item}-${i}`))
				})
			})
		]
	});
}
function HeroStat({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "font-display text-2xl font-semibold text-fire-gold md:text-3xl",
		children: value
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 text-xs tracking-wide text-text-muted uppercase",
		children: label
	})] });
}
function HowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "how-it-works",
		className: "mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-kicker",
				children: "How it works"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-3xl font-semibold md:text-4xl",
				children: "Four steps. Then the desk runs."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-text-muted",
				children: "No token to learn. No protocol to “ape.” Register, fund, connect rails, operate."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
			children: STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				as: "li",
				delay: i * 80,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCard, { step })
			}, step.n))
		})]
	});
}
function StepCard({ step }) {
	const ref = (0, import_react.useRef)(null);
	function onMove(e) {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(pointer: coarse)").matches) return;
		const r = el.getBoundingClientRect();
		const x = (e.clientX - r.left) / r.width - .5;
		const y = (e.clientY - r.top) / r.height - .5;
		el.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale(1.03)`;
	}
	function onLeave() {
		if (ref.current) ref.current.style.transform = "";
	}
	const Icon = step.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		ref,
		onPointerMove: onMove,
		onPointerLeave: onLeave,
		className: "step-card h-full p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-sm tracking-[0.2em] text-fire-gold",
					children: step.n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-fire-orange" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-8 font-display text-xl font-semibold",
				children: step.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-text-muted",
				children: step.body
			})
		]
	});
}
function Calculator() {
	const [capital, setCapital] = (0, import_react.useState)(2500);
	const daily = capital * DAILY_RATE;
	const monthly = daily * 30;
	const pct = (capital - 100) / 9900 * 100;
	const maxBar = Math.max(...BAR_WEIGHTS);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "calculator",
		className: "mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			className: "panel overflow-hidden rounded-2xl p-6 md:p-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-kicker",
						children: "Yield model"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl font-semibold md:text-4xl",
						children: "Simulate operational yield"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm leading-relaxed text-text-muted",
						children: [
							"Indicative ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fire-gold",
								children: "0.75% daily"
							}),
							" operational yield on vaulted USDT. Figures are simulated for demonstration only and are not a promise of return."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-8 block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-text-muted",
								children: "Initial operational capital"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-lg text-fire-gold tabular-nums",
								children: [formatUsd(capital, 0), " USDT"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "fire-slider mt-4",
							type: "range",
							min: 100,
							max: 1e4,
							step: 50,
							value: capital,
							"aria-valuemin": 100,
							"aria-valuemax": 1e4,
							"aria-valuenow": capital,
							"aria-label": "Operational capital in USDT",
							onChange: (e) => setCapital(Number(e.target.value)),
							style: { background: `linear-gradient(90deg, var(--fire-orange) ${pct}%, rgba(255,255,255,0.08) ${pct}%)` }
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [
							500,
							2e3,
							5e3,
							1e4
						].map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCapital(preset),
							className: cn("h-10 rounded-md px-3 text-xs font-medium transition-[background-color,color] duration-150", capital === preset ? "bg-fire-red text-text-light" : "bg-bg-deep text-text-muted hover:text-text-light"),
							children: formatUsd(preset, 0)
						}, preset))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between gap-6 rounded-xl bg-bg-deep p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-wide text-text-muted uppercase",
								children: "Est. daily"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-3xl font-semibold text-fire-gold tabular-nums",
								children: formatUsd(daily)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-wide text-text-muted uppercase",
								children: "Est. monthly"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-3xl font-semibold tabular-nums",
								children: formatUsd(monthly)
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-xs tracking-wide text-text-muted uppercase",
							children: "Seven-day shape"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-28 items-end gap-2",
							children: BAR_WEIGHTS.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 rounded-sm",
								style: {
									height: `${w / maxBar * 100}%`,
									opacity: .55 + w * .35,
									background: "linear-gradient(180deg, var(--fire-gold), var(--fire-red))"
								},
								title: `Day ${i + 1}`
							}, i))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs leading-relaxed text-text-muted",
							children: [
								"30-day cumulative at this capital:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-text-light tabular-nums",
									children: formatUsd(monthly)
								}),
								". Digital asset operations carry risk of loss."
							]
						})
					]
				})]
			})
		})
	});
}
function Features() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "features",
		className: "mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "section-kicker",
			children: "Features"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-3 font-display text-3xl font-semibold md:text-4xl",
			children: "Built for operators, not spectators."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid grid-cols-1 gap-4 md:grid-cols-6",
			children: FEATURES.map((f, i) => {
				const Icon = f.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: f.span,
					delay: i * 70,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "bento h-full p-6 md:p-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-fire-orange" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 font-display text-xl font-semibold",
								children: f.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-text-muted",
								children: f.body
							})
						]
					})
				}, f.title);
			})
		})]
	});
}
function Benefits() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "benefits",
		className: "mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "section-kicker",
			children: "Benefits"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-3 font-display text-3xl font-semibold md:text-4xl",
			children: "Trust is operational, not ornamental."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid grid-cols-1 gap-4 md:grid-cols-2",
			children: BENEFITS.map((b, i) => {
				const Icon = b.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 70,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel flex h-full gap-4 rounded-2xl p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-11 shrink-0 items-center justify-center rounded-lg bg-bg-deep",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-fire-orange" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-semibold",
							children: b.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-text-muted",
							children: b.body
						})] })]
					})
				}, b.title);
			})
		})]
	});
}
function CtaBand({ onApply }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-6xl px-4 py-16 md:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "relative overflow-hidden rounded-2xl bg-bg-surface px-6 py-12 text-center md:px-12 md:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 opacity-70",
				style: { background: "radial-gradient(60% 80% at 50% 120%, color-mix(in srgb, var(--fire-orange) 28%, transparent), transparent 70%)" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Open a seat"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl font-semibold md:text-4xl",
						children: "The forge is lit. Step in."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-3 max-w-lg text-text-muted",
						children: "Remote, disciplined, yield-bearing work on infrastructure that already runs. Apply in a minute."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "lg",
						className: "mt-8 min-w-52",
						onClick: onApply,
						children: ["Start Earning Today", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
					})
				]
			})]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-text-light/8 px-4 py-12 md:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "logo-type font-display text-base font-semibold",
				children: "Base Exchange Pro"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-sm text-sm leading-relaxed text-text-muted",
				children: "Infrastructure for automating and optimizing digital resource flows."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#how-it-works",
						className: "hover:text-text-light",
						children: "How It Works"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#calculator",
						className: "hover:text-text-light",
						children: "Yield model"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#features",
						className: "hover:text-text-light",
						children: "Features"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#benefits",
						className: "hover:text-text-light",
						children: "Benefits"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto mt-10 max-w-6xl space-y-3 text-xs leading-relaxed text-text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" Base Exchange Pro. All rights reserved."
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This interface is a demonstration. Yield figures are simulated and do not constitute an offer of financial services, investment advice, or a solicitation. Digital asset operations carry risk of loss. Past performance is not indicative of future results. No funds are collected through this page." })]
		})]
	});
}
var RAILS = [
	{
		bank: "DBS Singapore",
		status: "Live",
		currency: "USD"
	},
	{
		bank: "Revolut Europe",
		status: "Live",
		currency: "EUR"
	},
	{
		bank: "Wise UK",
		status: "Review",
		currency: "GBP"
	},
	{
		bank: "Bank of Georgia",
		status: "Live",
		currency: "GEL"
	}
];
var FLOWS = [
	{
		id: "OP-1842",
		rail: "DBS · USD",
		amount: 12840,
		yield: 96.3,
		age: "2m"
	},
	{
		id: "OP-1841",
		rail: "Revolut · EUR",
		amount: 6200,
		yield: 46.5,
		age: "11m"
	},
	{
		id: "OP-1840",
		rail: "Wise · GBP",
		amount: 4100,
		yield: 30.75,
		age: "24m"
	},
	{
		id: "OP-1839",
		rail: "BoG · GEL",
		amount: 2750,
		yield: 20.62,
		age: "41m"
	},
	{
		id: "OP-1838",
		rail: "DBS · USD",
		amount: 9800,
		yield: 73.5,
		age: "1h"
	}
];
function OperatorConsole({ session, onLogout }) {
	function logout() {
		try {
			localStorage.removeItem("bep.session");
		} catch {}
		onLogout();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-shell min-h-dvh bg-bg-deep",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-fire-red/40 bg-bg-deep/80 px-4 py-3 backdrop-blur-xl md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg font-semibold tracking-tight",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "logo-type",
					children: "Base Exchange Pro"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-text-muted",
				children: ["Operator desk · ", session.email]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: logout,
				className: "pl-4 pr-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {}), "Sign out"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Live session"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-2 font-display text-3xl font-semibold md:text-4xl",
					children: ["Welcome back, ", session.name]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-text-muted",
					children: "Demonstration console. Figures are simulated and stored only in this browser. No live rails are connected."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: Wallet,
							label: "Vault balance",
							value: formatUsd(12450)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: TrendingUp,
							label: "Yield · 24h",
							value: formatUsd(93.38),
							gold: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: Landmark,
							label: "Active rails",
							value: "3 / 4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: ShieldCheck,
							label: "Desk uptime",
							value: "99.98%"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8 grid grid-cols-1 gap-4 lg:grid-cols-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel rounded-2xl p-5 lg:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4 text-fire-orange" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold",
								children: "Recent flows"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[28rem] text-left text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "text-xs tracking-wide text-text-muted uppercase",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3 font-medium",
											children: "ID"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3 font-medium",
											children: "Rail"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3 font-medium",
											children: "Amount"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3 font-medium",
											children: "Yield"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3 font-medium",
											children: "Age"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: FLOWS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-text-light/8",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 font-medium tabular-nums",
											children: row.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 text-text-muted",
											children: row.rail
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 tabular-nums",
											children: formatUsd(row.amount, 0)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-3 tabular-nums text-fire-gold",
											children: ["+", formatUsd(row.yield)]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 text-text-muted",
											children: row.age
										})
									]
								}, row.id)) })]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel rounded-2xl p-5 lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-4 text-fire-orange" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold",
								children: "Bank rails"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-3",
							children: RAILS.map((rail) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between rounded-lg bg-bg-deep px-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: rail.bank
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-text-muted",
									children: rail.currency
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: rail.status === "Live" ? "text-xs font-medium text-fire-gold" : "text-xs font-medium text-text-muted",
									children: rail.status
								})]
							}, rail.bank))
						})]
					})]
				})
			]
		})]
	});
}
function Stat({ icon: Icon, label, value, gold }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "panel rounded-2xl p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-fire-orange" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs tracking-wide text-text-muted uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: gold ? "mt-1 font-display text-2xl font-semibold text-fire-gold tabular-nums" : "mt-1 font-display text-2xl font-semibold tabular-nums",
				children: value
			})
		]
	});
}
function Home() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [loginOpen, setLoginOpen] = (0, import_react.useState)(false);
	const [accessMode, setAccessMode] = (0, import_react.useState)("login");
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem("bep.session");
			if (!raw) return;
			const parsed = JSON.parse(raw);
			if (parsed?.email && parsed?.name) setSession(parsed);
		} catch {}
	}, []);
	if (session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperatorConsole, {
		session,
		onLogout: () => setSession(null)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPage, {
		loginOpen,
		onLoginOpenChange: setLoginOpen,
		accessMode,
		onAccessModeChange: setAccessMode,
		onAuthenticated: setSession
	});
}
//#endregion
export { Home as component };
