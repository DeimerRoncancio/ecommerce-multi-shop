type UserDataFieldProps = {
  fieldName: string,
  data?: string
}

export default function UserDataField({ fieldName, data }: UserDataFieldProps) {
  return (
    <div>
      <label className="text-[#c7c7c7]">{fieldName}</label>
      <div className="p-3 border-b-[1px] border-b-[#c7c7c7]">
        <input
          className="outline-0 w-full"
          value={data}
          type="text"
        />
      </div>
    </div>
  )
}
