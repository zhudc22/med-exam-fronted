export function getAccessToken(str?: string): string {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('authority') : str;
  if (!authorityString) {
    return undefined;
  }
  // let authority;
  // try {
  //   if (authorityString) {
  //     authority = JSON.parse(authorityString);
  //   }
  // } catch (e) {
  //   authority = authorityString;
  // }
  // if (typeof authority === 'string') {
  //   return authority;
  // }

  // return authority;
  return authorityString;
}

export function setAuthority(authority: string): void {
  localStorage.setItem('authority', authority);
}

export function clearAuthority(): void {
  localStorage.clear();
}
