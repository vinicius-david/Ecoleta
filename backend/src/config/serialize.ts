const Serialize = (filename: string) => {
  return `http://192.168.100.18:3333/files/${filename}`;
}

export default Serialize;
