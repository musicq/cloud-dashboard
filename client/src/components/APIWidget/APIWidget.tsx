import React, {ChangeEvent} from 'react'
import {CProps, WidgetProps} from '../../types'
import {TextInput} from '../TextInput'

interface APIWidgetProps extends WidgetProps {}

export const APIWidget = ({
  id,
  edit,
  data,
  onChange
}: CProps<APIWidgetProps>) => {
  if (!data) {
    return <div className="text-gray-700">API is not available now.</div>
  }

  const onDataSourceChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange({id, data: {source: e.target.value}})

  if (edit) {
    return (
      <TextInput
        label="API Source"
        value={data.source}
        onChange={onDataSourceChange}
      />
    )
  }

  return (
    <div>
      <div>API Source</div>
      <div className="text-gray-700">{data.source}</div>
    </div>
  )
}
