import { flatOutPlaylist } from './flatOutPlaylist.js'
import { phonkPlaylist } from './phonkPlaylist.js'
import { sportPlaylist } from './sportPlaylist.js'

export const music = phonkPlaylist.concat(sportPlaylist).concat(flatOutPlaylist)
