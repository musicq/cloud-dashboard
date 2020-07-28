import React, {ChangeEvent} from 'react'
import {noop} from '../../shared/noop'
import {CProps, WidgetProps} from '../../types'
import {TextInput} from '../TextInput'

interface SQLWidgetProps extends WidgetProps {}

export const SQLWidget = ({
  id,
  edit = false,
  data,
  onChange = noop
}: CProps<SQLWidgetProps>) => {
  if (!data) {
    return <div className="text-gray-700">SQL is not available now.</div>
  }

  const onDataSourceChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange({id, data: {source: e.target.value}})

  if (edit) {
    return (
      <TextInput
        label="SQL Source"
        value={data.source}
        onChange={onDataSourceChange}
      />
    )
  }

  return (
    <div>
      <div>SQL Source</div>
      <div className="text-gray-700">{data.source}</div>
    </div>
  )
}
