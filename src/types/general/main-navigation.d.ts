type CatchErrorProps = {
  type: string,
  message: string
}

type OwnerDetailProps = {
  id: number
}

type MainNavigation = {
  OwnerList: undefined,
  OwnerDetail: OwnerDetailProps,
  UnderConstruction: undefined,
  CatchError: CatchErrorProps,
}