//help.js
let currentVisibleBubble=null;let hideTimer=null;document.addEventListener('DOMContentLoaded',function(){const helpWrappers=document.querySelectorAll('.help-icon-wrapper');helpWrappers.forEach(wrapper=>{const bubble=wrapper.querySelector('.help-bubble, .help-bubble2');wrapper.addEventListener('click',function(e){e.stopPropagation();if(currentVisibleBubble&&currentVisibleBubble!==bubble){currentVisibleBubble.classList.remove('show')}if(hideTimer){clearTimeout(hideTimer)}if(currentVisibleBubble===bubble){bubble.classList.remove('show');currentVisibleBubble=null}else{currentVisibleBubble=bubble;bubble.classList.add('show');hideTimer=setTimeout(()=>{if(currentVisibleBubble===bubble){bubble.classList.remove('show');currentVisibleBubble=null}},5000)}})});document.addEventListener('click',function(event){if(currentVisibleBubble&&!event.target.closest('.help-icon-wrapper')){currentVisibleBubble.classList.remove('show');currentVisibleBubble=null;if(hideTimer){clearTimeout(hideTimer)}}})});
//splashes.js
async function loadSplashes() {try {const response = await fetch('splashes.txt');const text = await response.text();const splashes = text.split('\n').filter(line => line.trim() !== '');if (splashes.length > 0){const randomSplash = splashes[Math.floor(Math.random() * splashes.length)];document.getElementById('splash-text').textContent = randomSplash;document.getElementById('splash-shadow').textContent = randomSplash;document.getElementById('splash-text').style.fontSize = '26px';document.getElementById('splash-shadow').style.fontSize = '26px';}}catch (error) {console.error("读取标语失败:", error);}}loadSplashes();
//copy-toast.js
function showToast(){const toast=document.getElementById('copy-toast');if(!toast)return;toast.classList.remove('show');void toast.offsetWidth;toast.classList.add('show');setTimeout(()=>{toast.classList.remove('show');},5000);}async function copyCmd(){const txt=document.getElementById('tpCmd').textContent;await navigator.clipboard.writeText(txt);showToast();}async function copyCoord(id){const txt=document.getElementById(id).textContent;await navigator.clipboard.writeText(txt);showToast();}
//calc.main.js
/* 末影之眼今天心情不好，或者你的运气值需要充值了。请保持微笑，按下 F5，让“特性”再次降临，注意，不是源代码的问题哦 */
const developerReplies = [
"视觉的失焦，是为了让逻辑的焦点更锐利。","算法在混乱的边缘起舞，为你锚定那唯一的交点。","表象是无序的噪点，内核是绝对的几何。","眼睛看向虚空，却为你锁定了最坚实的坐标。","以混沌为基，以逻辑为尺，丈量你与要塞的距离。",
"在这双失焦的眼眸里，坐标是唯一的真理。","这双眼睛看不清世界，却能看清世界生成的种子。","乱中有序，歪中见准。","在随机性的迷雾中，为你点亮那盏确定性的灯。","逻辑锚定虚空。","眼斜，心不斜。","歪瞳的视线模糊了，但它的指引从未如此清晰。",
"在这看似混乱的飞行中，蕴藏着通往要塞的秘密。","混沌显形，坐标即真理。",
];
function getRandomReply() {const randomIndex = Math.floor(Math.random() * developerReplies.length);return developerReplies[randomIndex];}
function adj(id, d) {const i = document.getElementById(id);i.value = (parseFloat(i.value) || 0) + d;}
function calc() {
const errorContainer = document.querySelector(".My-Name-Is-Error");
const errorTextElement = document.getElementById("My-Name-Is-Error");
const x1 = +document.getElementById("x1").value || 0;
const z1 = +document.getElementById("z1").value || 0;
const x2 = +document.getElementById("x2").value || 0;
const z2 = +document.getElementById("z2").value || 0;
const x3 = +document.getElementById("x3").value || 0;
const z3 = +document.getElementById("z3").value || 0;
const x4 = +document.getElementById("x4").value || 0;
const z4 = +document.getElementById("z4").value || 0;
const resultCard = document.getElementById("resultCard");
try {
const inputs = ["x1", "z1", "x2", "z2", "x3", "z3", "x4", "z4"];
for (let id of inputs) {
const val = document.getElementById(id).value.trim();
if (val !== "" && isNaN(parseFloat(val))) {
throw new Error(`你输入的数据包含系统不认识字符：${id}`);
}}
const dx1 = x2 - x1;
const dz1 = z2 - z1;
const dx2 = x4 - x3;
const dz2 = z4 - z3;
const denominator = (dz1 * dx2) - (dx1 * dz2);
if (Math.abs(denominator) < 0.00001) {
throw new Error("只有两条直线相交才能计算！你的两条视线平行或重合，无法计算交点！");
}
const cross1 = (x1 * z2) - (z1 * x2);
const cross2 = (x3 * z4) - (z3 * x4);
const x = (cross1 * dx2 - dx1 * cross2) / denominator;
const z = (cross1 * dz2 - dz1 * cross2) / denominator;
const y = 36;
const startDist = Math.hypot(x3 - x1, z3 - z1);
let conf, confText;
if (startDist < 100) {
conf = "低";
confText = "低";
} else if (startDist < 300) {
conf = "中";
confText = "中";
} else {
conf = "高";
confText = "高";
}
const toFortDist = Math.hypot(x - x4, z - z4);
const dx = x1 - x; 
const dz = z1 - z;
let dir = "";
const absDx = Math.abs(dx);
const absDz = Math.abs(dz);
if (Number.isNaN(dx) || Number.isNaN(dz)) {
dir = "咱是在哪？";
} else if (Math.abs(dx) < 0.001 && Math.abs(dz) < 0.001) {
dir = "方向未知";
} else {
if (absDx < 0.001) {
dir = dz > 0 ? "正南" : "正北";
}
else if (absDz < 0.001) {
dir = dx > 0 ? "正东" : "正西";
}
else if (absDx > absDz) {
if (dx > 0) {
dir = dz > 0 ? "东南" : "东北";
} else {
dir = dz > 0 ? "西南" : "西北";
}
} else {
if (dz > 0) {
dir = dx > 0 ? "东南" : "西南";
} else {
dir = dx > 0 ? "东北" : "西北";
}}}
const rx = Math.round(x);
const rz = Math.round(z);
const cmd = `/tp @s ${Number.isNaN(rx) ? "~" : rx} ~ ${Number.isNaN(rz) ? "~" : rz}`;
document.getElementById("tpCmd").textContent = cmd;
document.getElementById("outX").textContent = rx;
document.getElementById("outZ").textContent = rz;
document.getElementById("distRow").textContent = `${Math.round(toFortDist)} blocks`;
document.getElementById("dir").textContent = dir;
document.getElementById("conf").textContent = confText;
document.getElementById("the-reply-from-the-developer-of-the-mcms.qzz.io-website").textContent = getRandomReply();
if (errorTextElement) {
errorTextElement.innerHTML = "<strong>无错误</strong>";
}
if (errorContainer) {
errorContainer.classList.remove("show");
}
if (resultCard) {
resultCard.style.display = "block";
}
} catch (error) {
if (errorTextElement) {
const safeMsg = error.message
.replace(/&/g, "&amp;")
.replace(/</g, "&lt;")
.replace(/>/g, "&gt;");
errorTextElement.innerHTML = `报错：${safeMsg}`;
}
if (errorContainer) {
errorContainer.classList.add("show");
}
document.getElementById("tpCmd").textContent = "/tp @s ~ ~ ~";
document.getElementById("outX").textContent = "NaN";
document.getElementById("outZ").textContent = "NaN";
document.getElementById("distRow").textContent = "NaN blocks";
document.getElementById("dir").textContent = "未知";
document.getElementById("conf").textContent = "无";
document.getElementById("the-reply-from-the-developer-of-the-mcms.qzz.io-website").textContent = "计算崩溃，但界面必须活着。";
if (resultCard) {
resultCard.style.display = "block";
}}
const weirdImages = ["imgs/(1).webp","imgs/(2).webp","imgs/(3).webp","imgs/(4).webp","imgs/(5).webp","imgs/(6).webp","imgs/(7).webp","imgs/(8).webp","imgs/(9).webp","imgs/(10).webp","imgs/(11).webp","imgs/(12).webp","imgs/(13).webp","imgs/(14).webp","imgs/(15).webp","imgs/(16).webp","imgs/(17).webp","imgs/(18).webp","imgs/(19).webp","imgs/(20).webp","imgs/(21).webp","imgs/(22).webp","imgs/(23).webp","imgs/(24).webp","imgs/(25).webp","imgs/(26).webp","imgs/(27).webp","imgs/(28).webp","imgs/(29).webp","imgs/(30).webp","imgs/(31).webp","imgs/(32).webp","imgs/(33).webp","imgs/(34).webp","imgs/(35).webp","imgs/(36).webp","imgs/(37).webp","imgs/(38).webp","imgs/(39).webp","imgs/(40).webp","imgs/(41).webp","imgs/(42).webp","imgs/(43).webp","imgs/(44).webp","imgs/(45).webp","imgs/(46).webp","imgs/(47).webp","imgs/(48).webp","imgs/(49).webp","imgs/(50).webp","imgs/(51).webp","imgs/(52).webp","imgs/(53).webp","imgs/(54).webp","imgs/(55).webp","imgs/(56).webp","imgs/(57).webp","imgs/(58).webp","imgs/(59).png","imgs/(60).png"];
const randomImg = weirdImages[Math.floor(Math.random() * weirdImages.length)];
document.getElementById("114514").style.display = "block";
const imgBox = document.getElementById("114514");
if (imgBox) {
imgBox.innerHTML = `<img src="${randomImg}" style="height:100px; border-radius:10px;">`;
}}
function resetAll() {
document.querySelectorAll("input").forEach((e) => (e.value = ""));
document.getElementById("resultCard").style.display = "none";
document.getElementById("114514").style.display = "none";
const e = document.getElementById("My-Name-Is-Error");
if (e) {
e.innerHTML = "<strong>无错误</strong>";
const p = e.parentNode;
p && p.classList.remove("show");
}}/* 末影之眼今天心情不好，或者你的运气值需要充值了。请保持微笑，按下 F5，让“特性”再次降临，不是源代码的问题哦 */
