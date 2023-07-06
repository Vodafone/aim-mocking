import mkdirp from 'mkdirp'

export default function ensurePath(path) {
  mkdirp.sync(path)
}
