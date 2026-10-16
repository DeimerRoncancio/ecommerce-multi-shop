const AVATARS = 5;

export const avatarNumbers = Array.from({ length: AVATARS }, (_, index) => index + 1);

export const isAvatar = (value: number) => Number.isInteger(value) && value >= 1 && value <= AVATARS;

export const avatarPath = (avatar: number) => `/images/avatar_${avatar}.svg`;

export const randomAvatar = () => Math.floor(Math.random() * AVATARS) + 1;

const avatarOf = (id: string) => ([...id].reduce((sum, char) => sum + char.charCodeAt(0), 0) % AVATARS) + 1;

export const avatarUrl = (userId: string | undefined, guestAvatar: number | undefined) =>
  avatarPath(userId ? avatarOf(userId) : (guestAvatar ?? 1));
