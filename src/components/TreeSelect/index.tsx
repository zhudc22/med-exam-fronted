/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Cascader } from 'antd';
import type { RequestOptionsType } from '@ant-design/pro-utils';
import { unflatten } from '@/utils/list'

export type SelectorProps = {
  fetchByParentId: (pid: number) => Promise<any[]>;
  fetchById?: (id: number) => Promise<any>;
  item2Option?: (item: any) => RequestOptionsType;
  value?: number[];
  onChange?: (value, selectedOptions) => void;
  disabled?: boolean;
};

const Selector: React.FC<SelectorProps> = (props) => {
 
  const { fetchByParentId, fetchById, item2Option, value, onChange, disabled } = props;
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchByParentId(0);
      let roots = response.map(it => item2Option(it));
      if (value) {
        const items = [];
        const ids = [];
        for (let i = 0; i < value.length; i += 1) {
          const found = response.find(it => it.id === value[i]);
          if (found) {
            items.push(item2Option(found));
          } else {
            ids.push(fetchById(value[i]));
          }
        }

        const rs = await Promise.all(ids);
        rs.forEach(it => items.push(item2Option(it)));
        const subtree = unflatten(items);
        const root = roots.find(it => it.id === subtree[0]?.id);
        if (root) {
          root.children = subtree[0].children;
        } else {
          roots = subtree;
        }
      }
      setOptions(roots);
    };
    fetchData();
  }, []);

  const loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    fetchByParentId(targetOption.value).then((rs) => {
      targetOption.loading = false;
      const items = rs.map(it => item2Option(it));
      targetOption.children = items;
      setOptions([...options]);
    });
  };

  return (
    <Cascader
      placeholder="请选择"
      key="treeSelect"
      value={value}
      options={options}
      loadData={loadData}
      onChange={onChange}
      changeOnSelect={true}
      allowClear={false}
      disabled={disabled}
    />
  );
};

export default Selector;
