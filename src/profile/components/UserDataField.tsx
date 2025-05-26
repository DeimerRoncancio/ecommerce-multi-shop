type UserDataFieldProps = {
  fieldName: string,
  data?: string
}

export default function UserDataField({ fieldName, data }: UserDataFieldProps) {
  return (
    <div>
      <h3 className="text-[#c7c7c7]">{ fieldName }</h3>
      <div className="p-3 border-b-[1px] border-b-[#c7c7c7]">
        { data }
      </div>
    </div>
  )
}
