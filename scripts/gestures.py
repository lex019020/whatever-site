import os, sys
# Схемы жестов для docs/posts/group-riding.md. Запуск: python scripts/gestures.py

OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), "..", "docs", "public", "gestures")
INK = '#2b2f36'
FILL = '#ffffff'
SHORTS = '#d5d9e0'
ACC = '#e5484d'
BG = '#f3f4f6'
HL = '#ffc94d'  # рука, которая показывает жест


def limb(points, w=10, fill=FILL):
    pts = ' '.join(f'{x},{y}' for x, y in points)
    return (f'<polyline points="{pts}" fill="none" stroke="{INK}" stroke-width="{w + 5}" stroke-linecap="round" stroke-linejoin="round"/>'
            f'<polyline points="{pts}" fill="none" stroke="{fill}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>')


def hand(x, y, r=6, fill=FILL):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{INK}" stroke-width="2.5"/>'


def arrow(x1, y1, x2, y2, dashed=False, both=False):
    d = ' stroke-dasharray="4 5"' if dashed else ''
    s = ' marker-start="url(#a)"' if both else ''
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{ACC}" stroke-width="3.5" stroke-linecap="round"{d}{s} marker-end="url(#a)"/>'


def arcs(x, y, side):
    s = 1 if side == 'r' else -1
    return ''.join(
        f'<path d="M{x + s * d},{y - h} q{s * (d * 0.6)},{h} 0,{2 * h}" fill="none" stroke="{ACC}" stroke-width="3.5" stroke-linecap="round"/>'
        for d, h in ((12, 10), (21, 15)))


def plimb(d, w=5):
    return (f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{w + 5}" stroke-linecap="round" stroke-linejoin="round"/>'
            f'<path d="{d}" fill="none" stroke="{FILL}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>')


# руль-баран сзади: верхняя перекладина, рожки с ручками и загнутые вниз хваты
BAR = (plimb('M60,114 L140,114')
       + plimb('M60,114 Q48,114 47,126 Q46,140 58,142')
       + plimb('M140,114 Q152,114 153,126 Q154,140 142,142')
       + f'<rect x="51" y="104" width="10" height="14" rx="4" fill="{FILL}" stroke="{INK}" stroke-width="2.5"/>'
       + f'<rect x="139" y="104" width="10" height="14" rx="4" fill="{FILL}" stroke="{INK}" stroke-width="2.5"/>')

LEFT_ARM = limb([(74, 82), (60, 98), (56, 106)])
RIGHT_ARM = limb([(126, 82), (140, 98), (144, 106)])


def rider(back_arms='', front='', left=LEFT_ARM, right=RIGHT_ARM, left_hand=(56, 106), right_hand=(144, 106), hl=''):
    hands = ''.join(hand(*h, fill=HL if side in hl else FILL) for side, h in (('l', left_hand), ('r', right_hand)) if h)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 224" width="160" height="179">
<defs><marker id="a" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{ACC}"/></marker></defs>
<rect width="200" height="224" rx="16" fill="{BG}"/>
<g stroke-linejoin="round">
<rect x="94" y="156" width="12" height="60" rx="6" fill="{FILL}" stroke="{INK}" stroke-width="2.5"/>
<line x1="100" y1="162" x2="100" y2="210" stroke="{INK}" stroke-width="1.5" stroke-dasharray="3 4"/>
{limb([(88, 140), (82, 168), (88, 194)], 11)}
{limb([(112, 140), (118, 162), (112, 180)], 11)}
<ellipse cx="89" cy="198" rx="7" ry="5" fill="{INK}"/>
<ellipse cx="112" cy="184" rx="7" ry="5" fill="{INK}"/>
{BAR}
{left}
{right}
{back_arms}
<path d="M78,126 L122,126 L125,146 Q100,154 75,146 Z" fill="{SHORTS}" stroke="{INK}" stroke-width="2.5"/>
<path d="M74,78 Q100,70 126,78 Q132,82 130,90 L122,128 Q100,133 78,128 L70,90 Q68,82 74,78 Z" fill="{FILL}" stroke="{INK}" stroke-width="2.5"/>
<path d="M81,114 Q100,118 119,114" fill="none" stroke="{INK}" stroke-width="1.8"/>
<line x1="94" y1="116.5" x2="94" y2="126" stroke="{INK}" stroke-width="1.8"/>
<line x1="106" y1="116.5" x2="106" y2="126" stroke="{INK}" stroke-width="1.8"/>
<rect x="94" y="64" width="12" height="12" rx="4" fill="{FILL}" stroke="{INK}" stroke-width="2.5"/>
<circle cx="100" cy="56" r="14" fill="{FILL}" stroke="{INK}" stroke-width="2.5"/>
<path d="M83,60 Q82,36 100,36 Q118,36 117,60 Q100,56 83,60 Z" fill="{FILL}" stroke="{INK}" stroke-width="2.5"/>
<path d="M93,40 L92,55 M100,39 L100,55 M107,40 L108,55" stroke="{INK}" stroke-width="2" stroke-linecap="round"/>
</g>
{front}
{hands}
</svg>
'''


def behind_back(x_end, y=118):
    # плечо сбоку, предплечье поперёк поясницы
    upper = limb([(126, 82), (134, 102), (130, y)], fill=HL)
    fore = limb([(130, y), (x_end, y)], fill=HL)
    return upper, fore


def finger(x1, y1, x2, y2, fill=HL):
    return (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>'
            f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{fill}" stroke-width="3" stroke-linecap="round"/>')


gestures = {}

gestures['point-down'] = rider(
    right=limb([(126, 82), (146, 110), (158, 136)], fill=HL), right_hand=(158, 136), hl='r',
    front=finger(160, 141, 164, 151)
          + arrow(167, 158, 172, 190, dashed=True)
          + f'<ellipse cx="174" cy="206" rx="16" ry="6" fill="{INK}"/>')

gestures['elbow-one'] = rider(
    right=limb([(126, 82), (154, 96), (144, 106)], fill=HL), hl='r', front=arcs(154, 98, 'r'))

gestures['turn'] = rider(
    right=limb([(126, 82), (184, 82)], fill=HL), right_hand=(184, 82), hl='r',
    front=arrow(140, 60, 180, 60))

up, fore = behind_back(86)
# предплечье поверх спины, поэтому оно во front
gestures['shift'] = rider(
    right=up, right_hand=None,
    front=fore + hand(86, 118, fill=HL)
          + finger(80, 118, 72, 118)
          + arrow(62, 118, 26, 118, dashed=True))

gestures['rails'] = rider(
    right=limb([(126, 82), (142, 112), (150, 140)], fill=HL), right_hand=(150, 140), hl='r',
    front=finger(151, 145, 153, 155)
          + arrow(132, 168, 176, 160, both=True)
          + f'<line x1="20" y1="214" x2="180" y2="186" stroke="{ACC}" stroke-width="3.5"/>'
          + f'<line x1="20" y1="222" x2="180" y2="194" stroke="{ACC}" stroke-width="3.5"/>')

gestures['elbows-both'] = rider(
    left=limb([(74, 82), (46, 96), (56, 106)], fill=HL),
    right=limb([(126, 82), (154, 96), (144, 106)], fill=HL), hl='lr',
    front=arcs(154, 98, 'r') + arcs(46, 98, 'l'))

palm = ''.join(finger(*f) for f in ((136, 26, 134, 12), (141, 24, 141, 9), (146, 25, 148, 11), (150, 29, 155, 19)))
gestures['stop'] = rider(
    right=limb([(126, 82), (138, 54), (142, 30)], fill=HL), right_hand=None,
    front=palm + f'<circle cx="143" cy="30" r="8" fill="{HL}" stroke="{INK}" stroke-width="2.5"/>')

os.makedirs(OUT, exist_ok=True)
for name, svg in gestures.items():
    with open(os.path.join(OUT, name + '.svg'), 'w', encoding='utf-8') as f:
        f.write(svg)
print(sorted(gestures))
