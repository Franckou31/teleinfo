var BAR_GRAPH_COLORS = {
  JB_HC: 'rgba(0,154,191, 1)',
  JB_HP: 'rgba(0,192,239, 1)',
  JW_HC: '#c2c2a3',
  JW_HP: '#FFFFFF',
  JR_HC: 'rgba(177,60,46, 1)',
  JR_HP: 'rgba(221,75,57, 1)'
};

var CARD_COLORS = {
  JB_HC: 'primary',
  JB_HP: 'primary',
  JW_HC: 'secondary',
  JW_HP: 'secondary',
  JR_HC: 'danger',
  JR_HP: 'danger'
};

var BAR_GRAPH_LABELS = {
  JB_HC: 'Bleu HC',
  JB_HP: 'Bleu HP',
  JW_HC: 'Blanc HC',
  JW_HP: 'Blanc HP',
  JR_HC: 'Rouge HC',
  JR_HP: 'Rouge HP'
};

export function getGraphColor(typeTarif) {
  return BAR_GRAPH_COLORS[typeTarif];
}
export function getGraphLabel(typeTarif) {
  return BAR_GRAPH_LABELS[typeTarif];
}
export function getCardColor(typeTarif) {
  return CARD_COLORS[typeTarif];
}
