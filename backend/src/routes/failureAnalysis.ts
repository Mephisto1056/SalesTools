import express from 'express';
import { failureAnalysisService, FailureAnalysisRequest } from '../services/failureAnalysisService';

const router = express.Router();

// 提交失败案例分析并获取AI分析
router.post('/analyze', async (req, res) => {
  try {
    console.log('收到失败分析请求');
    
    // 验证请求数据
    const request: FailureAnalysisRequest = req.body;
    
    if (!request || !request.case_description) {
      return res.status(400).json({
        code: 400,
        message: '请求数据格式错误，缺少案例描述',
        data: null
      });
    }

    // 验证案例描述长度
    if (request.case_description.trim().length < 50) {
      return res.status(400).json({
        code: 400,
        message: '案例描述过于简短，请提供更详细的信息（至少50个字符）',
        data: null
      });
    }

    if (request.case_description.length > 10000) {
      return res.status(400).json({
        code: 400,
        message: '案例描述过长，请控制在10000字符以内',
        data: null
      });
    }

    console.log('开始AI分析，案例描述长度:', request.case_description.length);

    // 调用AI分析服务
    const analysisResult = await failureAnalysisService.analyzeFailure(request);

    console.log('AI分析完成');

    // 保存匿名分析结果到管理员统计（可选）
    try {
      const linkId = req.body.linkId || null; // 从请求中获取linkId
      
      // TODO: 实现管理员统计功能
      console.log('分析结果统计:', {
        linkId,
        caseLength: request.case_description.length,
        timestamp: new Date().toISOString()
      });
      
      console.log('分析结果已记录到日志');
    } catch (error) {
      console.error('保存分析结果失败:', error);
      // 不影响用户体验，继续返回结果
    }

    // 返回分析结果
    return res.json({
      code: 200,
      message: '分析完成',
      data: analysisResult
    });

  } catch (error: any) {
    console.error('失败分析错误:', error);
    
    return res.status(500).json({
      code: 500,
      message: error.message || '分析服务暂时不可用，请稍后重试',
      data: null
    });
  }
});

// AI预测单个字段内容
router.post('/predict-field', async (req, res) => {
  try {
    console.log('收到字段预测请求');
    
    // 验证请求数据
    const { field_type, field_name, context, case_description } = req.body;
    
    if (!field_type || !field_name) {
      return res.status(400).json({
        code: 400,
        message: '请求数据格式错误，缺少字段类型或字段名称',
        data: null
      });
    }

    console.log('开始AI字段预测，字段类型:', field_type, '字段名称:', field_name);

    // 调用AI预测服务
    const prediction = await failureAnalysisService.predictField({
      field_type,
      field_name,
      context: context || '',
      case_description: case_description || ''
    });

    console.log('AI字段预测完成');

    // 返回预测结果
    return res.json({
      code: 200,
      message: '预测完成',
      data: {
        field_type,
        field_name,
        prediction
      }
    });

  } catch (error: any) {
    console.error('字段预测错误:', error);
    
    return res.status(500).json({
      code: 500,
      message: error.message || '预测服务暂时不可用，请稍后重试',
      data: null
    });
  }
});

// 获取分析模板（可选接口，用于前端展示示例）
router.get('/template', (_req, res) => {
  try {
    const template = {
      example_description: `我们公司是一家SaaS软件提供商，主要为中小企业提供客户关系管理系统。

这次失败的案例是与一家制造业公司的合作。客户是一家有200名员工的传统制造企业，他们希望数字化改造销售流程。

我方产品特征：我们的CRM系统功能全面，包含销售管道管理、客户数据分析、自动化营销等功能，界面现代化，支持移动端使用。

价格条件：我们报价是每用户每月120元，年付可享受8折优惠，总价约为19.2万元/年。

竞争对手：主要竞争对手是一家本土软件公司，他们的产品功能相对简单，但价格便宜（每用户每月60元），且在制造业有较多成功案例。

关键决策者：最初接触的是销售总监张总，他对我们的产品很感兴趣。但在决策过程中，IT总监李总和财务总监王总也参与进来。

沟通过程：我们进行了3次产品演示，张总反馈很积极。但在第二次演示后，李总提出了数据安全和系统集成的担忧。第三次演示时，王总对价格表示了明确的异议。

时间框架：整个销售周期持续了4个月，客户原计划在第3个月做决定，但由于内部讨论延长了决策时间。

最终失败原因：客户最终选择了竞争对手，主要原因是价格因素和对数据安全的担忧。客户认为我们的产品虽然功能强大，但超出了他们的实际需求和预算。`,
      
      tips: [
        "详细描述产品特征和优势",
        "说明价格策略和条件",
        "分析竞争对手情况",
        "识别关键决策者和影响者",
        "回顾沟通过程和关键节点",
        "明确时间框架和决策周期",
        "总结最终失败的具体原因"
      ]
    };

    res.json({
      code: 200,
      message: '获取模板成功',
      data: template
    });

  } catch (error: any) {
    console.error('获取模板错误:', error);
    
    res.status(500).json({
      code: 500,
      message: '获取模板失败',
      data: null
    });
  }
});

// 健康检查
router.get('/health', (_req, res) => {
  res.json({
    code: 200,
    message: '失败分析服务正常',
    data: {
      service: 'failure-analysis',
      status: 'healthy',
      timestamp: new Date().toISOString()
    }
  });
});

export default router;