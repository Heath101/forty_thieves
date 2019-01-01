export const events = {
  card: {
    auto: 'card:auto',
    pickup: 'card:pickup',
    drop: 'card:drop'
  },
  foundation: {
    add: 'foundation:add',
    draw: 'foundation:draw'
  },
  game: {
    new: 'game:new'
  },
  move: {
    undo: 'move:undo',
    add: 'move:add'
  }
}

export const dispatch = {
  game: {
    new: () => document.dispatchEvent(new CustomEvent('game:new'))
  },
  card: {
    auto: (detail) => document.dispatchEvent(new CustomEvent(events.card.auto, { detail })),
    pickup: (detail) => document.dispatchEvent(new CustomEvent(events.card.pickup, { detail })),
    drop: (detail) => document.dispatchEvent(new CustomEvent(events.card.drop, { detail }))
  },
  foundation: {
    add: () => document.dispatchEvent(new CustomEvent(events.foundation.add)),
    draw: () => document.dispatchEvent(new CustomEvent(events.foundation.draw))
  },
  move: {
    undo: () => document.dispatchEvent(new CustomEvent(events.move.undo)),
    add: (detail) => document.dispatchEvent(new CustomEvent(events.move.add, { detail }))
  }
}

export default {
  events,
  dispatch
}
